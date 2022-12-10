import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import SoftMakerTejeHandwriting from './fonts/SoftMakerTejeHandwriting.ttf';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'SoftMakerTejeHandwriting';
  src: local('SoftMakerTejeHandwriting'), local('SoftMakerTejeHandwriting');
  font-style: normal;
  src: url(${SoftMakerTejeHandwriting}) format('truetype')
}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'SoftMakerTejeHandwriting';
  }
`;

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 20% auto;
  border: 1px solid red;
  border-radius: 6px;
  padding: 50px;
  /* justify-content: center; */
  /* align-items: center; */

  /* margin: 0 auto; */
  /* background-color: red; */
`;

const CalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CalendarDays = styled.div`
  display: flex;
  /* text-align: center; */
  margin: 20px 0;
`;

const CalendarDay = styled.div`
  width: calc(100% / 7);
  text-align: center;
`;

const CalendarDates = styled.div`
  display: flex;
  flex-flow: row wrap;
  text-align: center;
`;

const CalendarDate = styled.div`
  width: calc(100% / 7);
  padding: 20px;
`;

function App() {
  const [date, setDate] = useState({
    year: new Date().getFullYear(), // 2022년
    month: new Date().getMonth(), // 11월(+1해서 사용)
  });
  const { year, month } = date;
  const prevLast = new Date(year, month, 0); //11월 마지막 일
  const thisLast = new Date(year, month + 1, 0); //12월 마지막 일

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);

  return (
    <>
      <GlobalStyle />
      <Calendar>
        <CalendarHeader>
          <div className="calendarYear-Month">
            {year}년 {month + 1}월
          </div>
          <div className="calendarNav">
            <button
              onClick={() => {
                if (month === 0) {
                  setDate({ year: year - 1, month: 11 });
                } else {
                  setDate({ ...date, month: month - 1 });
                }
              }}
            >
              &lt;
            </button>
            <button
              onClick={() => {
                setDate({
                  year: new Date().getFullYear(),
                  month: new Date().getMonth(),
                });
              }}
            >
              Today
            </button>
            <button
              onClick={() => {
                if (month === 11) {
                  setDate({ year: year + 1, month: 0 });
                } else {
                  setDate({ ...date, month: month + 1 });
                }
              }}
            >
              &gt;
            </button>
          </div>
        </CalendarHeader>
        <CalendarDays>
          <CalendarDay>Sun</CalendarDay>
          <CalendarDay>Mon</CalendarDay>
          <CalendarDay>Tue</CalendarDay>
          <CalendarDay>Wed</CalendarDay>
          <CalendarDay>Thu</CalendarDay>
          <CalendarDay>Fri</CalendarDay>
          <CalendarDay>Sat</CalendarDay>
        </CalendarDays>
        <CalendarDates>
          {dates.map((date, i) => (
            <CalendarDate key={i}>{date}</CalendarDate>
          ))}
        </CalendarDates>
      </Calendar>
    </>
  );
}

export default App;
