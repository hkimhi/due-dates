from flask import jsonify
from config import *
from canvasapi import Canvas
from datetime import datetime, timezone
import json

CURRENT_TERM = "2020W2"

def get_courses():
    canvas = Canvas(canvas_api_url, canvas_api_key)
    user = canvas.get_current_user()
    courses = user.get_courses(enrollment_state='active', include='term')

    data = {}

    for course in courses:
        if course.term['name'] == CURRENT_TERM:
            assignments = course.get_assignments()
            data[course.course_code] = parse_assignments(assignments)

    return jsonify(data)

def parse_assignments(assignments):
    assignments_list = []

    for assignment in assignments:
        if hasattr(assignment, 'due_at_date') and assignment.due_at_date > datetime.now(timezone.utc):
            currentAssignment = {'name': assignment.name, 'due_at_date': assignment.due_at_date}
            assignments_list.append(currentAssignment)

    return assignments_list    
