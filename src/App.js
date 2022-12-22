import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import SoftMakerTejeHandwriting from './fonts/SoftMakerTejeHandwriting.ttf';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

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
  position: relative;

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

  .selected {
    position: relative;
  }

  .selected::before {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    display: block;
    border: 1px solid red;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    content: '';
  }

  .scheduleNum {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
`;

function App() {
  const today = new Date();

  const [selected, setSelected] = useState(new Date());

  const [registerModal, setRegisterModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);

  const [calendar, setCalendar] = useState({
    year: new Date().getFullYear(), // 2022년
    month: new Date().getMonth(), // 11월(+1해서 사용)
  });
  const { year, month } = calendar;

  const [schedules, setSchedules] = useState([]);

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
    <Datea
      key={i}
      onClick={() => {
        prevMonth();
        setSelected(new Date(year, month - 1, date));
      }}
    >
      <span className="other">{date}</span>
    </Datea>
  );

  const makeCalendar = (date, i) => {
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
      (schedule) => schedule.date === `${year}-${month + 1}-${date}`,
    ).length;

    return (
      <>
        <Datea
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
        </Datea>
      </>
    );
  };

  const makeNextCalendar = (date, i) => (
    <Datea
      key={date}
      onClick={() => {
        nextMonth();
        setSelected(new Date(year, month + 1, date));
      }}
    >
      <span className="other">{date}</span>
    </Datea>
  );

  const scheduleModalOpen = () => {
    setScheduleModal(true);
  };

  const registerModalOpen = () => {
    setRegisterModal(true);
  };

  return (
    <>
      <GlobalStyle />
      <ScheduleModal
        scheduleModal={scheduleModal}
        setScheduleModal={setScheduleModal}
        selected={selected}
        setRegisterModal={setRegisterModal}
        schedules={schedules}
      />
      <RegisterModal
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        selected={selected}
        setSchedules={setSchedules}
        schedules={schedules}
        setScheduleModal={setScheduleModal}
      />
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
          {prevDates.map((date, i) => makePrevCalendar(date, i))}
          {thisDates.map((date, i) => makeCalendar(date, i))}
          {nextDates.map((date, i) => makeNextCalendar(date, i))}
        </Dates>
      </Calendar>
    </>
  );
}

function RegisterModal({
  registerModal,
  setRegisterModal,
  selected,
  setSchedules,
  schedules,
  setScheduleModal,
}) {
  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() >= 9
      ? selected.getMonth() + 1
      : '0' + (selected.getMonth() + 1)
  }-${
    selected.getDate() >= 10 ? selected.getDate() : '0' + selected.getDate()
  }`;

  const [input, setInput] = useState({
    date: '',
    content: '',
  });

  const { content } = input;

  const registerModalClose = () => {
    setRegisterModal(false);
    setInput({
      date: '',
      content: ``,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ date: selectedDate, [name]: value });
  };

  const onSubmit = () => {
    setSchedules([...schedules, input]);
    registerModalClose();
    setScheduleModal(true);
  };

  return (
    <>
      <Modal show={registerModal} onHide={registerModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shedule Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Selected Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={selectedDate}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Schedule</Form.Label>
              <Form.Control
                name="content"
                value={content}
                onChange={onChange}
                as="textarea"
                rows={3}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSubmit}>
            Save changes
          </Button>
          <Button variant="secondary" onClick={registerModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function ScheduleModal({
  scheduleModal,
  setScheduleModal,
  selected,
  setRegisterModal,
  schedules,
}) {
  const scheduleModalClose = () => {
    setScheduleModal(false);
  };

  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() + 1
  }-${selected.getDate()}`;

  const registerModalOpen = () => {
    setRegisterModal(true);
    scheduleModalClose();
  };

  return (
    <>
      <Modal
        show={scheduleModal}
        onHide={scheduleModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Date : {selectedDate}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '18vh', overflowY: 'auto' }}>
          <h4>Schedule :</h4>
          <ul>
            {schedules.map(
              (schedule, i) =>
                schedule.date ===
                  `${selected.getFullYear()}-${
                    selected.getMonth() + 1
                  }-${selected.getDate()}` && (
                  <li key={i}>{schedule.content}</li>
                ),
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={registerModalOpen}>
            Add
          </Button>
          <Button variant="secondary" onClick={scheduleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
