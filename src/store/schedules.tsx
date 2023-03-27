import { createSlice } from '@reduxjs/toolkit';
import { scheduleInterface } from 'type/interface';

const initialState: scheduleInterface[] = [];

const schedules = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    addSchedules(state, action) {
      return [...state, { ...action.payload }];
    },
    removeSchedules(state, action) {
      return state.filter(
        (schedule) => schedule.id !== parseInt(action.payload),
      );
    },
    sortSchedules(state) {
      return state.sort(function (a, b) {
        return Number(new Date(a.date)) - Number(new Date(b.date));
      });
    },
  },
});

export default schedules;
export const { addSchedules, removeSchedules, sortSchedules } =
  schedules.actions;
