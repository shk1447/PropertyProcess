import {
  PropertyHandler,
  PropertyHandlerOptions,
} from "./core/handler/PropertyHandler";
import useInterfaceHandle from "./core/hooks/useInterfaceHandle";
import { GetDotKeys, GetFunctionKeys } from "./core/types";

export type ViewModel<T> = {
  watcher: (keys: GetDotKeys<T> | GetDotKeys<T>[]) => T;
  handler: PropertyHandler<T>;
};

export const registViewModel = <T>(
  data: T,
  options?: PropertyHandlerOptions
): ViewModel<T> => {
  const handler = new PropertyHandler<T>(data, options);

  return {
    watcher: (keys: GetDotKeys<T> | GetDotKeys<T>[]): T =>
      useInterfaceHandle<T>(keys, handler) as T,
    handler,
  };
};

export const useViewModel = <T>(
  vm: ViewModel<T>,
  keys?: GetDotKeys<T>[]
): [T, (name: GetFunctionKeys<T>, payload: any) => void] => {
  const state = vm.watcher(keys ? keys : []);

  const send = (name: GetFunctionKeys<T>, payload: any) => {
    vm.handler.services.emit(name, [payload]);
  };

  return [state, send];
};
