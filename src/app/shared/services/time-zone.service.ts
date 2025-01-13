import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { DateTime } from 'luxon';
import {TimeZoneInterface} from '../../types/time-zone.interface';
import {setTimeZoneAction} from '../../store/actions/time-zone.action';

@Injectable({
  providedIn: 'root',
})
export class TimeZoneService {
  constructor(private store: Store<{ timeZone: TimeZoneInterface }>) {}

  public getTimeZone$(): Observable<{timeZone: TimeZoneInterface}> {
    return this.store.select((state) => state);
  }

  public setTimeZone(newTimeZone: TimeZoneInterface): void {
    this.store.dispatch(setTimeZoneAction.setTimeZone({ timeZone: newTimeZone }));
  }

  public toNgOffset(timeZone: string): string {
    const offset = DateTime.local().setZone(timeZone).offset;
    const signPrefix = offset < 0 ? '-' : '+';
    const hourOffset = this.addPrefixZero(Math.abs(Math.floor(offset / 60)));
    const minuteOffset = this.addPrefixZero(Math.abs(offset % 60));
    return `${signPrefix}${hourOffset}${minuteOffset}`;
  }

  private addPrefixZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  public getSystemTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
