# Python Parser
# Minyue Dai, Chujun He, Xueying Zeng
# Apr 10 2018

import os
import re
import io
from bs4 import BeautifulSoup
import json

def parseCourse(course):
    '''
    parse a string of a course block
    '''
    # 1, 2, 4, 6
    # position
    index = [1,2,4,6]
    # all keys
    keys = ["majorCode","courseCode","courseName","courseCredit"];
    coursedic={}
    for i in range(len(index)):
        tmp = course[index[i]]
        # count number of <>
        count = tmp.count("<")
        for j in range(count):
            # cut all <>
            index1 = tmp.index("<")
            index2 = tmp.index(">")+1
            tmp = tmp.replace(tmp[index1:index2],"")
        tmp = tmp.strip()
        print(tmp)
        if i == 1:
            # number
            tmp = int(tmp)
        if i == 3:
            # convert string to float, then to int
            tmp = int(float(tmp))

        # add dictionary
        coursedic[keys[i]]=tmp

    return coursedic

def saveJson(filename,data):
    '''
    save array or dict as a json file
    '''
    out_file = open(filename,"w")
    json.dump(data,out_file, indent=4)
    out_file.close()
    print("Data saved in ",os.getcwd()+"/"+filename)

    return

def parseHtmTranscript(file):
    '''
    a parser that takes Smith College online transcript(htm file)
    and parse it into a json file
    '''
    # b[1] b[2] b[4] b[6]
    # read files
    file = os.getcwd()+"/"+file
    f= io.open(file, mode="r", encoding="utf-8")
    code = f.read()
    # parse file
    soup = BeautifulSoup(code, 'html.parser')

    # regex for part of course block
    regex = "<td class=\"dddefault\" colspan=\"5\">"

    # select all courses
    tags = soup.find_all('tr')
    tags = [str(x) for x in tags]
    matches = [x for x in tags if regex in x]
    
    # handle each course
    courselist=[]
    for c in matches:
        courselist.append(parseCourse(c.split("\n")))
    
    # save the json file
    saveJson("courseList.json",courselist)
    
    return

# change to your own transcript
parseHtmTranscript("test.htm")




