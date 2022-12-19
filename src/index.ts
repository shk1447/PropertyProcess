import {
  GetDotKeys,
  PropertyHandler,
  PropertyHandlerOptions,
} from "./core/handler/PropertyHandler";
import useInterfaceHandle from "./core/hooks/useInterfaceHandle";

export const registViewModel = <T>(
  data: T,

  options?: PropertyHandlerOptions
) => {
  const handler = new PropertyHandler<T>(data, options);

  return {
    watcher: (keys: GetDotKeys<T> | GetDotKeys<T>[]): T =>
      useInterfaceHandle<T>(keys, handler) as T,
    handler,
  };
};
