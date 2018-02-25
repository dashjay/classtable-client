# 课程表微信小程序

## 使用方法

第一次登录要求扫描二维码形式的课程表,扫码后自动切换到课程表页面,重新在设置页面扫码可覆盖原来的课程表

## 二维码

字符串生成二维码


## JSON模板
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

真实样例,请注意数据类型,**生成二维码时强烈建议使用工具删除所有的换行和空格**
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

## 工具
[该网站](http://www.kjson.com/qr/)提供了上述工作所需的所有工具
