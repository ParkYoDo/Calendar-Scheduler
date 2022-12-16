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

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;

const Calendar = styled.div`
  width: 600px;
  margin: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const YearMonth = styled.div`
  font-size: 35px;
`;

const Nav = styled.div`
  display: flex;
  border: 1px solid #333333;
  border-radius: 5px;
`;

const Btn = styled.button`
  width: 28px;
  height: 30px;
  border: none;
  font-size: 16px;
  line-height: 34px;
  background-color: transparent;
  cursor: pointer;
`;

const TodayBtn = styled.button`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 16px;
  line-height: 34px;
  background-color: transparent;
  cursor: pointer;
  border-left: 1px solid #333333;
  border-right: 1px solid #333333;
`;

const Days = styled.div`
  display: flex;
  margin: 25px 0 10px;
`;

const Day = styled.div`
  width: calc(100% / 7);
  text-align: center;
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
`;

const Dates = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: 500px;
  border-top: 1px solid #333333;
  border-right: 1px solid #333333;
`;

const Datea = styled.div`
  width: calc(100% / 7);
  padding: 15px;
  text-align: right;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #333333;
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
  .other {
    opacity: 0.3;
  }

  .today {
    position: relative;
    color: #ffffff;
  }

  .today::before {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    display: block;
    background-color: #ff0000;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    content: '';
  }
`;

function App() {
  const [calendar, setCalendar] = useState({
    year: new Date().getFullYear(), // 2022년
    month: new Date().getMonth(), // 11월(+1해서 사용)
    modal: {
      index: '',
      visible: false,
    },
    schedule: [],
  });
  const { year, month } = calendar;

  const prevLast = new Date(year, month, 0); //11월 마지막 일
  const thisLast = new Date(year, month + 1, 0); //12월 마지막 일

  const plDate = prevLast.getDate(); // 11월 마지막 일
  const plDay = prevLast.getDay(); // 11월 마지막 요일

  const tlDate = thisLast.getDate(); // 12월 마지막 일
  const tlDay = thisLast.getDay(); // 11월 마지막 요일

  const prevDates = [];
  const thisDates = [...Array(tlDate + 1).keys()].slice(1);
  const nextDates = [];

  if (plDay !== 6) {
    for (let i = 0; i < plDay + 1; i++) {
      prevDates.unshift(plDate - i);
    }
  }
  for (let i = 1; i < 7 - tlDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);

  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(tlDate);

  const prevMonth = () => {
    if (month === 0) {
      setCalendar({ year: year - 1, month: 11 });
    } else {
      setCalendar({ ...calendar, month: month - 1 });
    }
  };

  const todayMonth = () => {
    setCalendar({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });
  };

  const nextMonth = () => {
    if (month === 11) {
      setCalendar({ year: year + 1, month: 0 });
    } else {
      setCalendar({ ...calendar, month: month + 1 });
    }
  };

  const today = new Date();
  console.log(today.getMonth());
  console.log(month);
  console.log(today.getFullYear());
  console.log(year);

  return (
    <>
      <GlobalStyle />
      <Calendar>
        <Header>
          <YearMonth>
            {year}년 {month + 1}월
          </YearMonth>
          <Nav>
            <Btn onClick={prevMonth}>&lt;</Btn>
            <TodayBtn onClick={todayMonth}>Today</TodayBtn>
            <Btn onClick={nextMonth}>&gt;</Btn>
          </Nav>
        </Header>
        <Days>
          <Day>Sun</Day>
          <Day>Mon</Day>
          <Day>Tue</Day>
          <Day>Wed</Day>
          <Day>Thu</Day>
          <Day>Fri</Day>
          <Day>Sat</Day>
        </Days>
        <Dates>
          {dates.map((date, i) => {
            const condition1 =
              i >= firstDateIndex && i < lastDateIndex + 1 ? null : 'other';
            const condition2 =
              year === today.getFullYear() &&
              month === today.getMonth() &&
              date === today.getDate()
                ? 'today'
                : null;
            return (
              <Datea key={i}>
                <span className={`${condition1} ${condition2}`}>{date}</span>
              </Datea>
            );
          })}
        </Dates>
      </Calendar>
    </>
  );
}

export default App;
