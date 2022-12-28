import { createSlice } from '@reduxjs/toolkit';

const schedules = createSlice({
  name: 'schedules',
  initialState: [],
  reducers: {
    addSchedules(state, action) {
      return [...state, { ...action.payload }];
    },
    removeSchedules(state, action) {
      return state.filter(
        (schedule) => schedule.id !== parseInt(action.payload),
      );
    },
  },
});

export default schedules;
export const { addSchedules, removeSchedules } = schedules.actions;
