#!/usr/bin/python3
import os
import fun
import login
import json
import qrcode
from PIL import Image
from bs4 import BeautifulSoup 


HTML_HEAD = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>"""

def get_class_info(username,password):
    flag = -1

    times = 0
    while flag < 0:
        times += 1
        s, flag = login.login(username, password)
        if times > 10:
            print("登录次数过多,请检查账号密码重新登录")
            return
    text = HTML_HEAD+s.get("http://jw.sdau.edu.cn/xkAction.do?actionType=6").text
    soup = BeautifulSoup(text,'lxml')
    map = {"一":1,"二":2,"三":3,"四":4,"五":5,"六":6,"七":7,"八":8,"九":9,"十":10}
    objs=[]
    start={
        "year":2018,
        "month":3,
        "day":5
        }
    for items in BeautifulSoup(str(soup.find_all('table')[7]),'lxml').find_all('tr',{'class':'odd'}):
        item = items.find_all('td')
        if len(item)<10:
            week_num=item[0].get_text().strip().replace('周','').replace('上','').split('-')
            week_num=range(int(week_num[0]),int(week_num[len(week_num)-1])+1)
            day_of_week=int(item[1].get_text().strip())
            class_of_day=map[item[2].get_text().strip()]
            duration=int(item[3].get_text().strip())
            place=item[5].get_text().strip()+item[6].get_text().strip()
        else:
            name=item[2].get_text().strip()
            week_num=item[11].get_text().strip().replace('周','').replace('上','').split('-')
            week_num=range(int(week_num[0]),int(week_num[len(week_num)-1])+1)
            day_of_week=int(item[12].get_text().strip())
            class_of_day=map[item[13].get_text().strip()]
            duration=int(item[14].get_text().strip())
            place=item[16].get_text().strip()+item[17].get_text().strip()    

        obj={
            "name":name,
            "place":place,
            "day_of_week":day_of_week,
            "class_of_day":class_of_day,
            "duration":duration,
            "week_num":list(week_num)
            }
        objs.append(obj)
    
    ret={"schdules_list":objs,"start":start}

    qr=qrcode.QRCode(
                version=40,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=5,
                border=5, 
                )
    qr.add_data(json.dumps(ret, ensure_ascii=False))
    qr.make(fit=True)
    img=qr.make_image()
    img.save("qr.png")
    print("二维码已被保存为qr.png")

if __name__ == '__main__':
    username=input('Username:')
    password=input('Password:')
    get_class_info(username,password)
