import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {TimeZoneInterface} from '../../types/time-zone.interface';


export const setTimeZoneAction = createActionGroup({
  source: 'TimeZone',
  events: {
    'Set Time Zone':  props<{ timeZone: TimeZoneInterface}>(),
  }
});
