import React, { useState } from "react";
import { people } from "./people.js";
import { rawTechnologies } from "./technologies.js";
import logo from "./assets/logo.svg";
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

  const numericalSkillMap = {
    none: 0,
    0: "none",
    junior: 1,
    1: "junior",
    intermediate: 2,
    2: "intermediate",
    advanced: 3,
    3: "advanced",
    teach: 4,
    4: "teach",
  };

  let average = {};
  technologies.map((tech) => {
    return Object.keys(people).map((person) => {
      if (people[person][tech] !== null) {
        if (Object.keys(average).includes(tech)) {
          average[tech] += numericalSkillMap[people[person][tech]];
        } else {
          average[tech] = numericalSkillMap[people[person][tech]];
        }
      }
      return average;
    });
  });

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th></th>
            <th colSpan={Object.keys(people).length + 1}>
              <div id="legend"></div>
            </th>
          </tr>
          <tr>
            <th></th>
            <th colSpan={Object.keys(people).length + 1}>
              <input
                type="search"
                placeholder="search technologies"
                onChange={(event) => handleChange(event)}
              />
            </th>
          </tr>
          <tr>
            <th></th>
            {Object.keys(people).map((person) => {
              return <th key={person}>{person}</th>;
            })}
            <th>
              <img alt="skiplist" src={logo} />
            </th>
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
                <td
                  className={
                    numericalSkillMap[
                      Math.round(average[tech] / Object.keys(people).length)
                    ]
                  }
                ></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
