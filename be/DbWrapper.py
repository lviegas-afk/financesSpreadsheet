import sqlite3


class DbWrapper:

    def insertUploadLog(self, date, filename):
        args = [date, filename, 0]
        conn = sqlite3.connect('../db/finances.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO UPLOAD_LOG(DATE,FILENAME,PROCESS) VALUES (?,?,?)', args)
        conn.commit()
        conn.close()

    def dict_factory(self, cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    def getUploadLog(self):
        conn = sqlite3.connect('../db/finances.db')
        conn.row_factory = self.dict_factory
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM UPLOAD_LOG ORDER BY DATE DESC LIMIT 10')
        records = cursor.fetchall()
        conn.close()
        return records
