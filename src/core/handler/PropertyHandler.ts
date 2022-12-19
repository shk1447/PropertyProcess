import { Change, Observable } from "../observer";
import { EventHandler } from "./EventHandler";

export type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type GetDotKeys<T> = T extends Date | Function | Array<any>
  ? ""
  : (
      T extends object
        ? {
            [K in Exclude<keyof T, symbol>]:
              | `${K}`
              | `${K}${DotPrefix<GetDotKeys<T[K]>>}`;
          }[Exclude<keyof T, symbol>]
        : ""
    ) extends infer D
  ? Extract<D, string>
  : never;

export type PropertyHandlerOptions = {
  // 하위 데이터 변경시 이벤트가 발생됩니다.
  deep: boolean;
};

export class PropertyHandler<R> extends EventHandler<GetDotKeys<R>> {
  private _property: R;
  private _observable: Observable & R;

  private _options?: { deep: boolean };
  constructor(state: R, options?: PropertyHandlerOptions) {
    super();
    this._property = state;
    this._options = options;

    this._observable = Observable.from(this._property);

    Observable.observe(this._observable, this.watch);
  }

  get property() {
    return this._observable;
  }

  private watch = (changes: Change[]) => {
    changes.forEach((change) => {
      const modifiedArray: Record<any, number> = {};

      change.path.splice(
        change.path.findIndex((d) => typeof d == "number"),
        change.path.length
      );

      if (this._options?.deep) {
        let eventName = "";

        change.path.forEach((item) => {
          eventName += item + ".";

          this.emit(
            eventName.substring(0, eventName.length - 1) as GetDotKeys<R>,
            [change.object]
          );
        });
      } else {
        const eventName = change.path.join(".");

        this.emit(eventName as GetDotKeys<R>, [change.object]);
      }
    });
  };

  public reset() {
    Observable.unobserve(this._observable);
    this._observable = Observable.from(this._property);
    Observable.observe(this._observable, this.watch);
  }
}