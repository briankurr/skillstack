import React, { useState } from "react";
import { people } from "./people.js";
import { rawTechnologies } from "./technologies.js";
import "./App.css";

function App() {
  const [technologies, setTechnologies] = useState(rawTechnologies);

  function handleChange(event) {
    const value = event.target.value.toLowerCase();
    if (value === "") {
      setTechnologies(rawTechnologies);
    } else {
      setTechnologies(
        rawTechnologies.filter((rawTech) =>
          rawTech.toLowerCase().includes(value)
        )
      );
    }
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="search"
                placeholder="search technologies"
                onChange={(event) => handleChange(event)}
              />
            </th>
            {Object.keys(people).map((person) => {
              return <th key={person}>{person}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {technologies.map((tech) => {
            return (
              <tr key={tech}>
                <td>{tech}</td>
                {Object.keys(people).map((person) => {
                  return (
                    <td
                      key={`${person}-${tech}`}
                      className={
                        people[person][tech] === null
                          ? "empty"
                          : people[person][tech]
                      }
                      person={person}
                      tech={tech}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
