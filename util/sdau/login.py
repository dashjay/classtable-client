import requests
from PIL import Image

import captcha

login_url = 'http://jw.sdau.edu.cn/loginAction.do'
captcha_url = 'http://jw.sdau.edu.cn/validateCodeAction.do'
score_url = 'http://jw.sdau.edu.cn/gradeLnAllAction.do?type=ln&oper=qbinfo'


headers_base = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}


def login(username, password):

    s = requests.session()

    vcode = s.get(captcha_url, stream=True)

    with open("demo.jpg", "wb") as file:
        for chunk in vcode.iter_content(10):
            file.write(chunk)

    num = captcha.captcha(Image.open('./demo.jpg'))
    user_data = {"zjh": username, "mm": password, "v_yzm": str(num)}

    r = s.post(login_url, headers=headers_base, data=user_data)
    flag = str(r.text).find(u'<title>学分制综合教务</title>')
    return [s, flag]


def get_score(session,):
    response = session.get(score_url)
    return(response.text)
