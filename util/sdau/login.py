import captcha
import requests
from PIL import Image

login_url = 'http://jw.sdau.edu.cn/loginAction.do'
captcha_url = 'http://jw.sdau.edu.cn/validateCodeAction.do'
score_url='http://jw.sdau.edu.cn/gradeLnAllAction.do?type=ln&oper=qbinfo'

# 请求头
headers_base={'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}


# 登陆
def login(username, password):
    
    # 创建session,且程序一直使用此session

    s=requests.session()
    # 从登录界面get验证码图片
    vcode = s.get(captcha_url, stream=True)
    #print(vcode.headers)
    # 保存验证码
    with open("demo.jpg", "wb") as file:
        for chunk in vcode.iter_content(10):
            file.write(chunk)
    
    # 自动识别验证码
    num=captcha.captcha(Image.open('./demo.jpg'))
    #print('验证码:'+str(num))

    # 构造post参数
    user_data = {"zjh": username, "mm": password, "v_yzm":str(num)}

    r=s.post(login_url, headers=headers_base, data=user_data)
    flag=str(r.text).find(u'<title>学分制综合教务</title>')
    # 此session以登录
    return [s,flag]

def get_score(session,):
    response=session.get(score_url)
    # print('登录成功,成绩已获取')
    return(response.text)
def main():
    flag=-1
    username=input('账号')
    password=input('密码')
    while flag<0:
        s,flag=login(str(username),str(password))
        if flag<0:
            print('验证码识别错误,正在尝试重新登录')
    get_score(s)
#main()
