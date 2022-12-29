import styled from 'styled-components';

export const CalendarBlock = styled.div`
  width: 600px;
  margin: 50px;
  @media screen and (max-width: 500px) {
    width: 310px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const YearMonth = styled.div`
  font-size: 35px;
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

export const Nav = styled.div`
  display: flex;
  border: 1px solid #333333;
  border-radius: 5px;
`;

export const Btn = styled.button`
  width: 28px;
  height: 30px;
  border: none;
  font-size: 16px;
  line-height: 34px;
  background-color: transparent;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 20px;
    font-size: 14px;
  }
`;

export const TodayBtn = styled.button`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 16px;
  line-height: 34px;
  background-color: transparent;
  cursor: pointer;
  border-left: 1px solid #333333;
  border-right: 1px solid #333333;
  @media screen and (max-width: 500px) {
    width: 50px;
    font-size: 14px;
  }
`;

export const ScheduleListBtn = styled.button`
  width: 150px;
  height: 30px;
  border: 1px solid #333333;
  border-radius: 5px;
  font-size: 16px;
  line-height: 34px;
  background-color: transparent;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  &:hover {
    .badge {
      display: block;
    }
  }
  .badge {
    display: none;
    position: absolute;
    top: 4px;
    right: 10px;
  }
  @media screen and (max-width: 500px) {
    width: 90px;
    font-size: 12px;
    text-align: left;
    .badge {
      display: none;
      position: absolute;
      font-size: 7px;
      top: 7px;
      right: 1px;
    }
  }
`;

export const Days = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    margin: 10px 0;
  }
`;

export const Day = styled.div`
  width: calc(100% / 7);
  text-align: center;
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
`;

export const Dates = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: 500px;
  border-top: 1px solid #333333;
  border-right: 1px solid #333333;
  @media screen and (max-width: 500px) {
    height: 380px;
  }
`;

export const Date = styled.div`
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
  @media screen and (max-width: 500px) {
    padding: 7px;
    .today::before {
      width: 22px;
      height: 22px;
    }
    .selected::before {
      width: 20px;
      height: 20px;
    }
  }
`;
