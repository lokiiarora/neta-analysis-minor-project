import sqlite3
import json
import os
import sys

# noob way of specifying full path , replace with your own

FILENAME =  "/Users/lokeshrajarora/Documents/Projects/neta-analysis-minor-project/data/2014-electoral-rolls.csv"

db=sqlite3.connect("db/cons2014.db")
iterator=db.cursor()
# 6
def filterData(row):
    ex = row.split(",")
    ex = [x.strip() for x in ex]
    for i in range(7,len(ex)):
        ex[i] = int(ex[i])
    print(ex)
    return ex

def insertData(array):
    # pass
    iterator.execute("insert into cons2014 values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", array)
    db.commit()

def createTables():
    try:
        iterator.execute("create table cons2014 (state text, pcno text, pcname text not null, pctype text, consno text,consname text, constype text, m1819 number, f1819 number, o1819 number, m18a number, f18a number,o18a number, ratio number, epicnum number, photo number )")
        db.commit()
    except sqlite3.OperationalError:
        print "Error"
    finally:
        print "Tables have been created"


with open(FILENAME,'rb') as File:
    # check this first line
    first = File.readline().split(",")
    createTables()
    for datarow in File.readlines():
        insertData(filterData(datarow))
    db.close()
    