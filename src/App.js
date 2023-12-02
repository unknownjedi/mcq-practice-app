import React, { useEffect, useState } from "react";
import "./App.css";

import index from "./assets/index.json";
import Test from "./Test";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [testSelected, setTestSelected] = useState(-1);

  useEffect(() => {
    // Create an array of promises for importing each JSON file
    const importPromises = index.map((fileName) =>
      import(`./assets/${fileName}`).then((module) => module.default)
    );

    // Resolve all promises and set the data
    Promise.all(importPromises)
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error loading JSON files:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {testSelected === -1 ? (
          <>
            <p>Select a Test</p>
            {jsonData.map((data, index) => (
              <div key={index}>
                {/* Render your JSON data here */}
                <div
                  className="App-link"
                  onClick={() => setTestSelected(index)}
                >
                  {data.name}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              className="App-link top-right"
              onClick={() => setTestSelected(-1)}
            >
              Select different test
            </div>
            <Test data={jsonData[testSelected]} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
