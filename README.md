# 课程表微信小程序


## 小程序码

![小程序码](img/gh.jpg)

## 使用方法

首次登录要求扫码录入课程表,重新扫码可覆盖原有课程表


## 根据自己的课程信息写JSON模板

[JSON格式化](http://www.kjson.com/jsformat/),方便查看课程信息是否出错
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

[生成无换行和空格的JSON数据](http://www.kjson.com/jsonparser/),并检查是否有语法错误

## 生成二维码
[生成二维码](http://www.kjson.com/qr/),纠错级别改为`L 7%`.

## 最后
以上仅给出建议使用的工具,可根据自身情况决定是否使用
