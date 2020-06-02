import React from "react";
import { people } from "./people.js";
import { technologies } from "./technologies.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th id="corner"></th>
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
                      className={people[person][tech]}
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
