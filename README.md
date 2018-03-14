# 课程表微信小程序


## 小程序码

![小程序码](img/gh.jpg)

## 已知BUG
* ~~二维码包含限制,太多课程导致二维码生成失败~~.使用剪切板直接获取数据,避开二维码的限制

## 使用方法

首次登录要求扫码录入课程表,重新扫码可覆盖原有课程表

课程表二维码获取方法有两种

1. 若存在该校自动获取程序,可在util下找到对应学校运行main.py
2. 若不存在,则需按以下步骤手动添加

## 学校支持列表

* SDAU

## 根据模板写课程信息

[JSON格式化](http://www.kjson.com/jsformat/)
```json
{
    "schdules_list": [{
        "name": "课程名",
        "place": "上课地点",
        "day_of_week": "周几",
        "class_of_day": "第几节课",
        "duration": "课程持续时间",
        "week_num": ["上课周数"]
    },
    {
        "name": "课程名2",
        "place": "上课地点",
        "day_of_week": "周几",
        "class_of_day": "第几节课",
        "duration": "课程持续时间",
        "week_num": ["上课周数"]
    },
    ],
    "start": {
        "year": "年",
        "month": "月",
        "day": "日"
    }
}
```
请确保开学时间为第一周星期一

真实样例,请注意数据类型,
```json
{
    "schdules_list": [{
        "name": "编译原理",
        "place": "5N-102",
        "day_of_week": 1,
        "class_of_day": 3,
        "duration": 2,
        "week_num": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    {
        "name": "编译原理",
        "place": "5N-102",
        "day_of_week": 5,
        "class_of_day": 3,
        "duration": 2,
        "week_num": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }],
    "start": {
        "year": 2018,
        "month": 2,
        "day": 23
    }
}
```

## 生成字符串

将JSON数据作为字符串生成二维码,**强烈建议使用工具删除所有的换行和空格**,存在空格和换行不确定能否成功读入

[生成无换行和空格的JSON数据](http://www.kjson.com/jsonparser/)

## 生成二维码
[生成二维码](http://www.kjson.com/qr/),纠错级别改为`L 7%`.
