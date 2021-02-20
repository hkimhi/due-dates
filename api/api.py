from main import *
from flask import Flask, redirect

app = Flask(__name__)

@app.route('/')
@app.route('/home')
@app.route('/index')
def base():
    return redirect("/data")

@app.route("/data")
def courses():
    json_data = get_courses()
    return json_data
