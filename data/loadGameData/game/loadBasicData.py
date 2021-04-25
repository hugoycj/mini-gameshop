import csv
from mysql.connector.cursor import RE_SQL_COMMENT
import mysql.connector

cnx = mysql.connector.connect(user='csc3170', password='csc3170',
                              host='hugoycj.cn',
                              database='csc3170')

cursor = cnx.cursor()

insert = "insert into game (`game_id`,`title`,`release_date`,`publisher`,`developer`,`total_achievements`) values (%s,%s,%s,%s,%s,%s);"

cnt = 0
firstRow = True 
with open("steam.csv",'r', encoding='utf-8') as f:
    f_csv = csv.reader(f)
    for row in f_csv:
        if firstRow:
            firstRow = False 
            continue 
        cnt = cnt + 1
        value = (row[0],row[1],row[2],row[5],row[4],row[11]) 
        cursor.execute(insert,value)

print(cnt)
cnx.commit()