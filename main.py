import os.path
import sys
import time
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from collections import deque
import xlrd
import re
from src.ServiceMapper import ServiceMapper
from src.wrapper.database import Database
import locale
from datetime import datetime, date



def processXLS():
    wb = xlrd.open_workbook(os.path.join('excels', 'UltimosMovimientos.xls'))
    sheet = wb.sheet_by_index(0)
    col = 1
    row = 14
    cell = sheet.cell_value(row, col)
    de = deque()
    dbwrapper = Database(r'E:\workspace\financesSpreadsheet\db\finances.db')
    while cell != '':
        data = {
            'date': sheet.cell_value(row, col),
            'desc': sheet.cell_value(row, 3),
            'referencia': sheet.cell_value(row, 4),
            'imp': sheet.cell_value(row, 5)
        }
        date_data = datetime.strptime(data['date'], "%d/%m/%Y").date()
        importe = locale.atof(data['imp'])
        result = dbwrapper.select_operation([data['referencia'], importe, date_data, 'lucas'])
        if not len(result):
            de.append(data)
        else:
            print('ya esta repetido')
        print('fecha: {} - descripcion: {} - importe: {}'.format(data['date'], data['desc'], data['imp']))
        row += 1
        cell = sheet.cell_value(row, col)

    cells = []
    grow = 2
    while de:
        data = de.pop()
        date_data = datetime.strptime(data['date'], "%d/%m/%Y").date()
        importe = locale.atof(data['imp'])
        jsoncell = [
            (date_data - date(1899, 12, 30)).days,
            data['desc'],
            importe,
            ServiceMapper().get(data['desc']),
            'Lucas'
        ]
        cells.append(jsoncell)
        dbwrapper.insert_operation([data['referencia'], importe, date_data,'lucas' ])
    try:
        scope = ['https://www.googleapis.com/auth/spreadsheets', "https://www.googleapis.com/auth/drive"]
        credentials = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
        client = gspread.authorize(credentials)
        worksheet = client.open('financesSpreadsheet').get_worksheet_by_id(0)
        worksheet.append_rows(cells)
    except gspread.exceptions.APIError:
        print("me timeouteo el api espero y vuelvo a probar")
        time.sleep(30)


if __name__ == '__main__':
    locale.setlocale(locale.LC_ALL, '')
    processXLS()
