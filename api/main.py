from flask import jsonify
from config import *
from canvasapi import Canvas
from datetime import datetime, timezone

CURRENT_TERM = "2020W2"


def get_courses():
    canvas = Canvas(canvas_api_url, canvas_api_key)
    user = canvas.get_current_user()
    courses = user.get_courses(enrollment_state='active', include='term')

    data = {}

    for course in courses:
        if course.term['name'] == CURRENT_TERM:
            assignments = course.get_assignments(order_by='due_at')

            for assignment in assignments:
                if hasattr(assignment, 'due_at_date') and assignment.due_at_date > datetime.now(timezone.utc):
                    data[assignment.name] = {
                        'due_at_date': assignment.due_at_date, 'course': course.course_code}

    return jsonify(data)
