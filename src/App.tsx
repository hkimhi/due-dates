import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";

interface Assignment {
  name: String;
  course: String;
  time: number;
  due_date: Date;
}

function App() {
  const [assignments, setAssignments] = useState(new Array<Assignment>());

  useEffect(() => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        var sortedAssignments = Object.keys(data).map(function (key) {
          var currentAssignment: Assignment = {
            name: key,
            course: data[key].course,
            time: Date.parse(data[key].due_at_date),
            due_date: new Date(Date.parse(data[key].due_at_date)),
          };

          return currentAssignment;
        });

        sortedAssignments.sort((a, b) => a.time - b.time);

        setAssignments(sortedAssignments);
      });
  }, []);

  return (
    <div className="parent">
      <table className="assignments-table">
        <tr>
          <th className="name">Name</th>
          <th className="due-date">Due Date</th>
          <th className="source">Source</th>
        </tr>

        {assignments.map(function (assignment) {
          let options = {
            hour: "numeric",
            minute: "numeric",
            weekday: "short",
            month: "short",
            day: "2-digit",
          };

          return (
            <tr>
              <td>{assignment.name}</td>
              <td>{assignment.due_date.toLocaleString("en-CA", options)}</td>
              <td>Canvas</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
