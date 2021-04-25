import csv
from mysql.connector.cursor import RE_SQL_COMMENT
import mysql.connector
import random

cnx = mysql.connector.connect(user='csc3170', password='csc3170',
                              host='hugoycj.cn',
                              database='csc3170')

cursor = cnx.cursor()

cursor.execute("select user_id from user")
userList = []
for user in cursor.fetchall():
    userList.append(user[0])

for user in userList:
    gameList = []
    cursor.execute("select game_id from ownership where user_id = {}".format(user))
    for game in cursor.fetchall():
        gameList.append(game[0])
    for game in gameList:
        cursor.execute("select total_achievements from game where game_id = {}".format(game))
        max = cursor.fetchall()[0][0]
        c = "update ownership set achievement_num = {} where game_id = {} and user_id = {}".format(str(random.randint(0,max)),str(game),str(user)) 
        print(c)
        cursor.execute(c)

cnx.commit()