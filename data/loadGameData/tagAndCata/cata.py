import csv
from mysql.connector.cursor import RE_SQL_COMMENT
import mysql.connector

cnx = mysql.connector.connect(user='csc3170', password='csc3170',
                              host='hugoycj.cn',
                              database='csc3170')

cursor = cnx.cursor()

insert = "insert into categories (`game_id`,`category`) values (%s,%s);"

cnt = 0 
firstRow = True 
with open("steam.csv",'r', encoding='utf-8') as f:
    f_csv = csv.reader(f) 
    for row in f_csv:
        if firstRow:
            firstRow = False 
            continue 
        for item in row[10].split(";"):
            values = (row[0],item)
            cursor.execute(insert,values)
            cnt = cnt + 1

print(cnt) 
cnx.commit()
