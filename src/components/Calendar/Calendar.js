import React, { useState } from 'react';
import ScheduleModal from '../ScheduleModal/ScheduleModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import * as S from './CalendarStyle';
import Badge from 'react-bootstrap/Badge';

function Calendar() {
  const [selected, setSelected] = useState(new Date());
  const [schedules, setSchedules] = useState([]);

  const [registerModal, setRegisterModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);

  const [calendar, setCalendar] = useState({
    year: new Date().getFullYear(), // 2022년
    month: new Date().getMonth(), // 12월(0~11)
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

  const makePrevCalendar = (date, i) => (
    <S.Date
      key={date}
      onClick={() => {
        prevMonth();
        setSelected(new Date(year, month - 1, date));
      }}
    >
      <span className="other">{date}</span>
    </S.Date>
  );

  const makeCalendar = (date, i) => {
    const today = new Date();

    const condition1 =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      date === today.getDate()
        ? 'today'
        : null;

    const condition2 =
      year === selected.getFullYear() &&
      month === selected.getMonth() &&
      date === selected.getDate()
        ? 'selected'
        : null;

    const scheduleNum = schedules.filter(
      (schedule) =>
        schedule.date ===
        `${year}-${month >= 9 ? month + 1 : '0' + (month + 1)}-${
          date >= 10 ? date : '0' + date
        }`,
    ).length;

    return (
      <S.Date
        key={date}
        onClick={(e) => {
          setSelected(new Date(year, month, date));
          scheduleNum ? scheduleModalOpen() : registerModalOpen();
        }}
      >
        <span className={` ${condition1} ${condition2}`}>{date}</span>
        <Badge bg="secondary scheduleNum">
          {scheduleNum !== 0 && scheduleNum}
        </Badge>
      </S.Date>
    );
  };

  const makeNextCalendar = (date, i) => (
    <S.Date
      key={date}
      onClick={() => {
        nextMonth();
        setSelected(new Date(year, month + 1, date));
      }}
    >
      <span className="other">{date}</span>
    </S.Date>
  );

  const scheduleModalOpen = () => {
    setScheduleModal(true);
  };

  const registerModalOpen = () => {
    setRegisterModal(true);
  };

  return (
    <>
      <ScheduleModal
        scheduleModal={scheduleModal}
        setScheduleModal={setScheduleModal}
        selected={selected}
        setRegisterModal={setRegisterModal}
        schedules={schedules}
        setSchedules={setSchedules}
      />
      <RegisterModal
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        selected={selected}
        setSchedules={setSchedules}
        schedules={schedules}
        setScheduleModal={setScheduleModal}
      />
      <S.CalendarBlock>
        <S.Header>
          <S.YearMonth>
            {year}년 {month + 1}월
          </S.YearMonth>
          <S.Nav>
            <S.Btn onClick={prevMonth}>&lt;</S.Btn>
            <S.TodayBtn onClick={todayMonth}>Today</S.TodayBtn>
            <S.Btn onClick={nextMonth}>&gt;</S.Btn>
          </S.Nav>
        </S.Header>
        <S.Days>
          <S.Day>Sun</S.Day>
          <S.Day>Mon</S.Day>
          <S.Day>Tue</S.Day>
          <S.Day>Wed</S.Day>
          <S.Day>Thu</S.Day>
          <S.Day>Fri</S.Day>
          <S.Day>Sat</S.Day>
        </S.Days>
        <S.Dates>
          {prevDates.map((date, i) => makePrevCalendar(date, i))}
          {thisDates.map((date, i) => makeCalendar(date, i))}
          {nextDates.map((date, i) => makeNextCalendar(date, i))}
        </S.Dates>
      </S.CalendarBlock>
    </>
  );
}

export default Calendar;
