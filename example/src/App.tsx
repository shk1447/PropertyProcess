import React from "react";

import { registViewModel } from "property-process";

type CountType = {
  count: number;
  multiply: number;
  nested: {
    test: string[];
    deepTest: {
      level: number;
    };
  };
  increase: () => void;
  decrease: () => void;
};

const { watcher, handler } = registViewModel<CountType>(
  {
    count: 0,
    multiply: 0,
    nested: {
      test: [],
      deepTest: {
        level: 1,
      },
    },
    increase() {
      handler.state.count += 1;
    },
    decrease() {
      handler.state.count -= 1;
    },
  },
  { deep: true }
);

handler.on("count", () => {
  handler.state.multiply = handler.state.count * 2;
});

function App() {
  const state = watcher(["count", "nested"]);
  console.log(state);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", gap: "4px" }}>
        <button onClick={state.increase}>+</button>
        <span>{state.count}</span>
        <button onClick={state.decrease}>-</button>
      </div>
      <button onClick={() => state.nested.test.push("1")}>Nested Test</button>
    </div>
  );
}

export default App;
