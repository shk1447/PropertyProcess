import { useLayoutEffect, useState } from "react";
import { GetDotKeys, PropertyHandler } from "../handler/PropertyHandler";

const useInterfaceHandle = <R>(
  keys: GetDotKeys<R> | GetDotKeys<R>[],
  handle: PropertyHandler<R>
): R => {
  const [renderCount, setRenderCount] = useState<number>(0);

  useLayoutEffect(() => {
    handle.increaseReference();
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
      handle.decreaseReference();
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          handle.off(key, changeState);
        });
      } else {
        handle.off(keys, changeState);
      }
    };
  }, []);

  return handle.state as R;
};

export default useInterfaceHandle;
