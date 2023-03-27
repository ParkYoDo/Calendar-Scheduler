import React, { useState } from 'react';
import ScheduleModal from 'components/ScheduleModal/ScheduleModal';
import RegisterModal from 'components/RegisterModal/RegisterModal';
import ScheduleListModal from 'components/ScheduleListModal/ScheduleListModal';
import * as S from 'components/Calendar/CalendarStyle';
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { sortSchedules } from 'store/schedules';
import { RootState } from 'store/store';

function Calendar() {
  const schedules = useSelector((state: RootState) => state.schedules);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(new Date());

  const [registerModal, setRegisterModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [schuleListModal, setScheduleListModal] = useState(false);

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

  const makePrevCalendar = (date: number) => (
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

  const makeCalendar = (date: number) => {
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

  const makeNextCalendar = (date: number) => (
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

  const scheduleListModalOpen = () => {
    if (schedules.length === 0) {
      alert('Registered schedule does not exist');
    } else {
      dispatch(sortSchedules());
      setScheduleListModal(true);
    }
  };

  return (
    <>
      <ScheduleModal
        scheduleModal={scheduleModal}
        setScheduleModal={setScheduleModal}
        setRegisterModal={setRegisterModal}
        selected={selected}
      />
      <RegisterModal
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        setScheduleModal={setScheduleModal}
        selected={selected}
      />
      <ScheduleListModal
        schuleListModal={schuleListModal}
        setScheduleListModal={setScheduleListModal}
        selected={selected}
      />
      <S.CalendarBlock>
        <S.Header>
          <S.ScheduleListBtn onClick={scheduleListModalOpen}>
            📅 Schedule
          </S.ScheduleListBtn>
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
          {prevDates.map((date) => makePrevCalendar(date))}
          {thisDates.map((date) => makeCalendar(date))}
          {nextDates.map((date) => makeNextCalendar(date))}
        </S.Dates>
      </S.CalendarBlock>
    </>
  );
}

export default Calendar;
