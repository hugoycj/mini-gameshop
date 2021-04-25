import csv
from mysql.connector.cursor import RE_SQL_COMMENT
import mysql.connector

cnx = mysql.connector.connect(user='csc3170', password='csc3170',
                              host='hugoycj.cn',
                              database='csc3170')

cursor = cnx.cursor()

insert = "insert into tags (`game_id`,`tag`,`vote`) values (%s,%s,%s);"


cnt = 0
firstRow = True 
with open("steamspy_tag_data.csv",'r', encoding='utf-8') as f:
    f_csv = csv.reader(f)
    tagList = []
    for row in f_csv:
        if firstRow:
            firstRow = False 
            for i in range(1,len(row)):
                tagList.append(row[i]) 
        else:
            for i in range(1,len(row)):
                if int(row[i]) != 0:
                    values = (row[0],tagList[i-1],int(row[i]))
                    cursor.execute(insert,values)
                    cnt = cnt+1
                    print(cnt)

print(cnt)
cnx.commit()
        




