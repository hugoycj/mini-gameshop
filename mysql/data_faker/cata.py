import csv
from mysql.connector.cursor import RE_SQL_COMMENT
from connector import cnx

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
