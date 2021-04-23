import csv
from mysql.connector.cursor import RE_SQL_COMMENT
from connector import cnx

cursor = cnx.cursor()

cnt = 0
firstRow = True 

update = "update plantform set `requirement` = %s where game_id = %s and plantform = %s;"
plantList = ["windows","mac","linux"]

with open("steam_requirements_data.csv","r",encoding='utf-8') as f:
    f_csv = csv.reader(f)
    for row in f_csv:
        if firstRow:
            firstRow = False 
            continue 
        cnt = cnt + 1
        for i in range(1,4):
            if(row[i] != "[]"):
                values = (row[i],row[0],plantList[i-1])
                cursor.execute(update,values)
 
        cursor.execute(update,values)

print(cnt)
cnx.commit()