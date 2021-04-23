import csv
from mysql.connector.cursor import RE_SQL_COMMENT
from connector import cnx

cursor = cnx.cursor()

cnt = 0
firstRow = True 

update = "update game set `description` = %s where game_id = %s;"

with open("steam_description_data.csv","r",encoding='utf-8') as f:
    f_csv = csv.reader(f)
    for row in f_csv:
        if firstRow:
            firstRow = False 
            continue 
        cnt = cnt + 1
        values = (row[3],row[0])
        # print(row[3],len(row[3]))
        # if cnt == 10:
        #     break
        cursor.execute(update,values)

print(cnt)
cnx.commit()