import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [courses ,setCourses] = useState(Object);

  useEffect(() => {
    fetch('/data').then(res => res.json()).then(data => {
      setCourses(data);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(courses).map(function(key) {
          if(courses[key])
          {
            return (
              <li>{key} - {courses[key].length}</li>
              
            )
          }
          return null
        })}
      </header>
    </div>
  );
}

export default App;
