import {createFeature, createReducer, on} from "@ngrx/store";
import {setTimeZoneAction} from '../actions/time-zone.action';
import {TimeZoneInterface} from '../../types/time-zone.interface';


const initialState: { currentTimeZone: string } = {
  currentTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZoneInterface,
};

const timeZoneFeature = createFeature({
    name: 'timeZone',
    reducer: createReducer(
      initialState,
      on(setTimeZoneAction.setTimeZone, (state, { timeZone }) => ({
        ...state,
        currentTimeZone: timeZone,
      })))
  }
);


export const {
  name: timeZoneFeatureKey,
  reducer: timeZoneReducer,
} = timeZoneFeature;
