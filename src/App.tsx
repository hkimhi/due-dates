import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";

function App() {
  const [courses, setCourses] = useState(Object);

  useEffect(() => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  return (
      <table className="assignments-table">
        <tr>
          <th>Name</th>
          <th>Due Date</th>
          <th>Source</th>
        </tr>

        {Object.keys(courses).map(function (key) {
          return Object.keys(courses[key]).map(function (secondKey) {
            return (
              <tr>
                <td>{courses[key][secondKey].name}</td>
                <td>{courses[key][secondKey].due_at_date}</td>
                <td>Canvas</td>
              </tr>
            );
          });
        })}
      </table>
  );
}

export default App;
