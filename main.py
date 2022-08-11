import sys
import time
from pprint import pprint
from gspread.cell import Cell
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from collections import deque

import xlrd


def processXLS():
    wb = xlrd.open_workbook('excels\\UltimosMovimientos.xls')
    sheet = wb.sheet_by_index(0)
    col = 1
    row = 14
    cell = sheet.cell_value(row, col)
    de = deque()
    while cell != '':
        data = {
            'date': sheet.cell_value(row, col),
            'desc': sheet.cell_value(row, 3),
            'imp': sheet.cell_value(row, 5)
        }
        de.append(data)
        print('fecha: {} - descripcion: {} - importe: {}'.format(data['date'], data['desc'], data['imp']))
        row += 1
        cell = sheet.cell_value(row, col)

    cells = []
    grow = 2
    while de:
        data = de.pop()
        cells.append(Cell(row=grow, col=1, value=data['date']))
        cells.append(Cell(row=grow, col=2, value=data['desc']))
        cells.append(Cell(row=grow, col=3, value=data['imp']))
        cells.append(Cell(row=grow, col=4, value='Lucas'))
        cells.append(Cell(row=grow, col=5, value='Lucas'))
        grow += 1
    try:
        scope = ['https://www.googleapis.com/auth/spreadsheets', "https://www.googleapis.com/auth/drive"]
        credentials = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
        client = gspread.authorize(credentials)
        worksheet = client.open('financesSpreadsheet').get_worksheet_by_id(0)
        worksheet.update_cells(cells)
    except gspread.exceptions.APIError:
        print("me timeouteo el api espero y vuelvo a probar")
        time.sleep(30)


if __name__ == '__main__':
    processXLS()
