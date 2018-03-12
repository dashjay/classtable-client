from flask import Flask
from flask import request
import get_class_info
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    username= request.args.get('username')
    password= request.args.get('password')
    return get_class_info.get_class_info(username,password)

if __name__ == '__main__':
    app.run()
