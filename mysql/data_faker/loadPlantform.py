import csv
from mysql.connector.cursor import RE_SQL_COMMENT
from connector import cnx

cursor = cnx.cursor()

insert = "insert into plantform (`game_id`,`plantform`) values (%s,%s);"

cnt = 0
firstRow = True 
with open("steam.csv",'r', encoding='utf-8') as f:
    f_csv = csv.reader(f)
    for row in f_csv:
        if firstRow:
            firstRow = False 
            continue 
        cnt = cnt + 1
        for plantform in row[6].split(";"):
            value = (row[0],plantform)
            cursor.execute(insert,value)

print(cnt)
cnx.commit()