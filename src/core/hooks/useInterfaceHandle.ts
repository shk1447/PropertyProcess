import React, { useLayoutEffect, useMemo, useState } from "react";
import { GetDotKeys, PropertyHandler } from "../handler/PropertyHandler";

const useInterfaceHandle = <R>(
  keys: GetDotKeys<R> | GetDotKeys<R>[],
  handle: PropertyHandler<R>
) => {
  const [renderCount, setRenderCount] = useState<number>(0);

  useLayoutEffect(() => {
    const changeState = () => {
      setRenderCount((prev: number) => prev + 1);
    };

    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        handle.on(key, changeState);
      });
    } else {
      handle.on(keys, changeState);
    }

    return () => {
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          handle.off(key, changeState);
        });
      } else {
        handle.off(keys, changeState);
      }
    };
  }, []);

  return handle.property;
};

export default useInterfaceHandle;
