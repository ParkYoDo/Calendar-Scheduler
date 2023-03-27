import { createSlice } from '@reduxjs/toolkit';
import { scheduleInterface } from 'type/interface';

const initialState: scheduleInterface[] = [];

const schedules = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    addSchedules(state, action) {
      return [...state, { ...action.payload }].sort((a, b) => {
        return Number(new Date(a.date)) - Number(new Date(b.date));
      });
    },
    removeSchedules(state, action) {
      return state.filter(
        (schedule) => schedule.id !== Math.floor(action.payload),
      );
    },
  },
});

export default schedules;
export const { addSchedules, removeSchedules } = schedules.actions;
