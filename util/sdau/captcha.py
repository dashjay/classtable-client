#!/usr/bin/python3
#-*- coding:utf8 -*-

import fun
import os
from PIL import Image
def captcha(im=None):
    url='./charText/'
    fileNames=os.listdir(url)
    chars=fun.captchaToCharPicture(im)
    answer=''
    for char in chars:
        text1=fun.charPictureToText(char)
        similarity=0.0
        temp=''
        for fileName in fileNames:
            text2=fun.openFileAndGetText(url+fileName)
            if fun.similarityOfText(text1,text2)>similarity:
                similarity=fun.similarityOfText(text1,text2)
                temp=fileName[0]
        answer+=temp
    return answer

def test():
    print('测试函数')
    print(captcha(Image.open('./demo.jpg')))

#test()

