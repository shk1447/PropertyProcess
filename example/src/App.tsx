import React from "react";

import { registViewModel, useViewModel } from "property-process";

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

const appViewModel = registViewModel<CountType>(
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
      console.log(this);
      this.count = this.count + 1;
      console.log(appViewModel.handler.state);
    },
    decrease() {
      console.log(this);
      this.count = this.count - 1;
    },
  },
  { deep: true }
);

function App() {
  const [state, send] = useViewModel(appViewModel, ["count"]);

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
        <button onClick={() => send("increase", {})}>+</button>
        <span>{state.count}</span>
        <button onClick={() => send("decrease", {})}>-</button>
      </div>
      <button onClick={() => state.nested.test.push("1")}>Nested Test</button>
    </div>
  );
}

export default App;
