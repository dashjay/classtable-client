#!/usr/bin/python3
#-*- coding:utf8 -*-

import os
import sys
from PIL import Image

# 传入一张原始验证码图片,返回拆分好的字符图片
def captchaToCharPicture(im=None):
    
    pixLimit=5 # 像素点个数阀值
          
    # 颜色范围
    min=0
    max=96
    
    # 返回值字符串
    text=''
    
    # 转换为8位彩色图像,固定数量为256,方便下一步操作
    im = im.convert("P")

    # 二值化
    # 创建一张白色背景图
    im2 = Image.new("P",im.size,255)
        

    # 读出im中所有像素点，改写im2，将合适范围内的点设置为黑色
    for x in range(im.size[1]):
        for y in range(im.size[0]):
            pix = im.getpixel((y,x))
            if min<=pix<=max:                
                im2.putpixel((y,x),0)
       

    # 分割单个字符
    inletter = False # 是否在字母内部
    foundletter=False # 是否找到字母
    start=0 # 起始位置
    end=0 # 终止位置

    # letters为列表,保存开始和结束位置横坐标
    letters = []

    for y in range(im2.size[0]):
        for x in range(im2.size[1]):
            pix = im2.getpixel((y,x))
            # 255为白色,如果不是白色则必定找到了字母
            if pix != 255:
                inletter = True
            
        if foundletter==False and inletter==True:
            foundletter=True
            start=y
        if foundletter==True and inletter==False:
            foundletter=False
            end=y
            letters.append((start,end))

        inletter=False

    picture=[] # 尝试保存多个图片对象
    for letter in letters:
        im3 = im2.crop(( letter[0] , 0, letter[1],im2.size[1] ))
        temp=0 # 判断im3中像素点的个数,小于临界值的不保存
        
        for x in range(im3.size[1]):
            for y in range(im3.size[0]):
                pix = im3.getpixel((y,x))
                if min<=pix<=max:
                    temp+=1
        
        if temp>pixLimit:
            picture.append(im3)

    return picture
    
    
# 输入字符图片,返回文本类型的图片信息
def charPictureToText(im):
    # 文件字符串
    answer=[]
    # size[0]为行数
    for x in range(im.size[1]):
        #size[1]为列数
        text='' # 保存一行 
        for y in range(im.size[0]):
            pix=im.getpixel((y,x))
            # 点为黑色
            if pix==0:
                text=text+'1'
            else:
                text=text+'0'
        answer.append(text+'\n')
    return answer

# 输入文本类型的图片信息和保存路径(精确到文件)
def saveTextFile(text,path):
    f=open(path,'w')
    f.writelines(text)
    f.close()

# 批量处理,将字符图片转化为文本类型的图片信息,并保存
# 输入获得字符图片的路径和保存文本的路径(精确到目录)
def imagePathToTextFile(charPath='./char/',textPath='./charText/'):

    lists=os.listdir(charPath)

    for imName in lists:
        im=Image.open(charPath+imName)
        text=charPictureToText(im)
        saveTextFile(text,textPath+imName[0]+'.txt')

# 输入文本信息的字符路径(精确到文件),返回列表类型的字符信息
def openFileAndGetText(charTextPath):
    f=open(charTextPath,'r')
    text=''
    text=f.readlines();
    return text

# 输入两个文本类型字符信息,返回相似度
def similarityOfText(text1,text2):
    lenth=len(text1)<len(text2) and len(text1) or len(text2)
    width=len(text1[0])<len(text2[0]) and len(text1[0]) or len(text2[0])
    
    total=0.0
    right=0.0
    for x in range(lenth):
        for y in range(width):
            total+=1
            if text1[x][y]==text2[x][y]:
                right+=1
    return right/total


# 测试
def test():
    print('测试函数')
    imagePathToTextFile()

#test()
