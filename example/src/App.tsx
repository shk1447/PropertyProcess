import React from "react";

import { registProperty } from "property-process";

type CountType = {
  count: number;
  multiply: number;
  increase: () => void;
  decrease: () => void;
};

const { watcher, handler } = registProperty<CountType>({
  count: 0,
  multiply: 0,
  increase() {
    handler.property.count += 1;
  },
  decrease() {
    handler.property.count -= 1;
  },
});

handler.on("count", () => {
  handler.property.multiply = handler.property.count * 2;
});

function App() {
  const state = watcher(["count"]);
  return (
    <div>
      <div style={{ display: "flex", gap: "4px" }}>
        <button onClick={state.increase}>+</button>
        <span>{state.count}</span>
        <button onClick={state.decrease}>-</button>
      </div>
    </div>
  );
}

export default App;