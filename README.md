# PropertyProcess

watch and handle properties easily

## Install

`npm install --save property-process`
`yarn add property-process`

## Usage

```ts
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
  increase: (payload: { amount: number }) => void;
  decrease: (payload: { amount: number }) => void;
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
    increase(payload) {
      this.count = this.count + 1 + payload.amount;
    },
    decrease() {
      this.count = this.count - 1;
    },
  },
  { deep: true }
);

function App() {
  const [state, send] = useViewModel(appViewModel, ["count", "nested.test"]);

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
        <button onClick={() => send("increase", { amount: 1 })}>+</button>
        <span>{state.count}</span>
        <button onClick={() => send("decrease", { amount: 1 })}>-</button>
      </div>
      <button onClick={() => state.nested.test.push("1")}>Nested Test</button>
    </div>
  );
}

export default App;
```

## Furture Feature

- Add PropertyHandler Options
