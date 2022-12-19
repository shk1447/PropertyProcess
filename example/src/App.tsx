import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { registProperty } from "property-process";

export type CounterType = {
  count: number;
  increase: () => void;
  descrease: () => void;
};

const { watcher, handler } = registProperty<CounterType>({
  count: 0,
  increase: () => {
    handler.property.count++;
  },
  descrease: () => {
    handler.property.count--;
  },
});

function App() {
  const { count } = watcher("count");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{ display: "flex", gap: "4px" }}>
          <button>+</button>
          <span>{count}</span>
          <button>-</button>
        </div>
      </header>
    </div>
  );
}

export default App;
