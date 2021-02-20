from main import *
import time
from flask import Flask

app = Flask(__name__)

@app.route("/time")
def get_current_time():
    return {"time": time.time()}

@app.route("/courses")
def courses():
    json_data = get_current_courses()
    return json_data
