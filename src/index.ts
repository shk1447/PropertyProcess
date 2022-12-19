import {
  GetDotKeys,
  PropertyHandler,
  PropertyHandlerOptions,
} from "./core/handler/PropertyHandler";
import useInterfaceHandle from "./core/hooks/useInterfaceHandle";

export const registProperty = <T>(
  data: T,

  options?: PropertyHandlerOptions
) => {
  const handler = new PropertyHandler<T>(data, options);

  return {
    watcher: (keys: GetDotKeys<T> | GetDotKeys<T>[]) =>
      useInterfaceHandle<T>(keys, handler),
    handler,
  };
};
