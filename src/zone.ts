import { Observable } from "rxjs";

import { getZone } from "./utils";

export const zoneOperator =
  <T>(zone?: Zone) =>
  (source: Observable<T>) =>
    new Observable((suber) => {
      zone = zone || getZone();
      return source.subscribe({
        next(value) {
          zone.run(() => {
            suber.next(value);
          });
        },
        complete() {
          zone.run(() => {
            suber.complete();
          });
        },
        error(err) {
          zone.run(() => {
            suber.error(err);
          });
        },
      });
    });
