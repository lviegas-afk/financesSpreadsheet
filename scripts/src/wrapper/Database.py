import sqlite3
from typing import List, Any


class Database:

    def __init__(self, dbpath: str):
        self.dbPath = dbpath

    def dict_factory(self, cursor, row) -> dict:
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    def _generate_cursor(self) -> sqlite3.Cursor:
        self.conn = sqlite3.connect(self.dbPath)
        self.conn.row_factory = self.dict_factory
        cursor = self.conn.cursor()
        return cursor

    def select_operation(self, param) -> list[Any]:
        ##[data['referencia'], importe, date_data, 'usuario']
        sql = "SELECT * FROM operation WHERE reference = ? AND amount = ? AND date = ? AND user = ?"
        cursor = self._generate_cursor()
        cursor.execute(sql, param)
        records = cursor.fetchall()
        self.conn.close()
        return records

    def insert_operation(self, param) -> None:
        ##[data['referencia'], importe, date_data, categoria, 'usuario']
        sql = "INSERT INTO operation(reference,amount,date, id_category ,user) VALUES(?,?,?,?,?)"
        cursor = self._generate_cursor()
        cursor.execute(sql,param)
        self.conn.close()

