import csv
from mysql.connector.cursor import RE_SQL_COMMENT
from connector import cnx

cursor = cnx.cursor()

cnt = 0
firstRow = True 

update = "update game set `cover_image` = %s where game_id = %s;"

with open("steam_media_data.csv","r",encoding='utf-8') as f:
    f_csv = csv.reader(f)
    for row in f_csv:
        if firstRow:
            firstRow = False 
            continue 
        cnt = cnt + 1
        print(row[0],row[1])
        values = (row[1],row[0])
        cursor.execute(update,values)

print(cnt)
cnx.commit()