import { createSlice } from '@reduxjs/toolkit';

const schedules = createSlice({
  name: 'schedules',
  initialState: [
    { id: 0, date: '2022-07-08', content: '박요도 생일' },
    { id: 1, date: '2022-03-03', content: '윤혜원 생일' },
  ],
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
