from flask import jsonify
from config import *
from canvasapi import Canvas

CURRENT_TERM = "2020W2"

def get_current_courses():
    canvas = Canvas(canvas_api_url, canvas_api_key)
    user = canvas.get_current_user()
    courses = user.get_courses(enrollment_state='active', include='term')

    data = {}

    for course in courses:
        if course.term['name'] == CURRENT_TERM:
            data[course.name] = True
        else:
            data[course.name] = False

    return jsonify(data)
