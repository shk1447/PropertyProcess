import React from "react";

import { registViewModel } from "property-process";

type CountType = {
  count: number;
  multiply: number;
  increase: () => void;
  decrease: () => void;
};

const { watcher, handler } = registViewModel<CountType>({
  count: 0,
  multiply: 0,
  increase() {
    handler.state.count += 1;
  },
  decrease() {
    handler.state.count -= 1;
  },
});

handler.on("count", () => {
  handler.state.multiply = handler.state.count * 2;
});

function App() {
  const state = watcher(["count"]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", gap: "4px" }}>
        <button onClick={state.increase}>+</button>
        <span>{state.count}</span>
        <button onClick={state.decrease}>-</button>
      </div>
    </div>
  );
}

export default App;
