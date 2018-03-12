#!/usr/bin/python3
#-*- coding:utf8 -*-

import os
import sys

from PIL import Image


def captchaToCharPicture(im=None):

    pixLimit = 5

    min = 0
    max = 96

    im = im.convert("P")

    im2 = Image.new("P", im.size, 255)

    for x in range(im.size[1]):
        for y in range(im.size[0]):
            pix = im.getpixel((y, x))
            if min <= pix <= max:
                im2.putpixel((y, x), 0)

    inletter = False
    foundletter = False
    start = 0
    end = 0

    letters = []

    for y in range(im2.size[0]):
        for x in range(im2.size[1]):
            pix = im2.getpixel((y, x))
            if pix != 255:
                inletter = True

        if foundletter == False and inletter == True:
            foundletter = True
            start = y
        if foundletter == True and inletter == False:
            foundletter = False
            end = y
            letters.append((start, end))

        inletter = False

    picture = []
    for letter in letters:
        im3 = im2.crop((letter[0], 0, letter[1], im2.size[1]))
        temp = 0
        for x in range(im3.size[1]):
            for y in range(im3.size[0]):
                pix = im3.getpixel((y, x))
                if min <= pix <= max:
                    temp += 1

        if temp > pixLimit:
            picture.append(im3)

    return picture


def charPictureToText(im):
    answer = []
    for x in range(im.size[1]):
        text = ''
        for y in range(im.size[0]):
            pix = im.getpixel((y, x))
            if pix == 0:
                text = text+'1'
            else:
                text = text+'0'
        answer.append(text+'\n')
    return answer


def saveTextFile(text, path):
    f = open(path, 'w')
    f.writelines(text)
    f.close()


def imagePathToTextFile(charPath='./char/', textPath='./charText/'):

    lists = os.listdir(charPath)

    for imName in lists:
        im = Image.open(charPath+imName)
        text = charPictureToText(im)
        saveTextFile(text, textPath+imName[0]+'.txt')


def openFileAndGetText(charTextPath):
    f = open(charTextPath, 'r')
    text = ''
    text = f.readlines()
    return text


def similarityOfText(text1, text2):
    lenth = len(text1) < len(text2) and len(text1) or len(text2)
    width = len(text1[0]) < len(text2[0]) and len(text1[0]) or len(text2[0])

    total = 0.0
    right = 0.0
    for x in range(lenth):
        for y in range(width):
            total += 1
            if text1[x][y] == text2[x][y]:
                right += 1
    return right/total
