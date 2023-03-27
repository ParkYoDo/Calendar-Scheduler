import styled from 'styled-components';

export const CalendarBlock = styled.div`
  width: 340px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 600px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const YearMonth = styled.div`
  font-size: 22px;
`;

export const Nav = styled.div`
  display: flex;
  border: 1px solid #adadad;
  border-radius: 5px;
`;

export const Btn = styled.button`
  width: 20px;
  height: 30px;
  border: none;
  font-size: 14px;
  line-height: 30px;
  background-color: transparent;
  cursor: pointer;
`;

export const TodayBtn = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  font-size: 14px;
  line-height: 30px;
  background-color: transparent;
  cursor: pointer;
  border-left: 1px solid #adadad;
  border-right: 1px solid #adadad;
`;

export const ScheduleListBtn = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #adadad;
  border-radius: 4px;
  font-size: 14px;
  line-height: 30px;
  background-color: transparent;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

export const Days = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

export const Day = styled.div`
  width: calc(100% / 7);
  font-size: 16px;
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
  height: 340px;
  border-top: 1px solid gray;
  border-right: 1px solid gray;
  font-size: 16px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 500px;
  }
  @media screen and (min-width: 1024px) {
    height: 600px;
  }
`;

export const Date = styled.div`
  width: calc(100% / 7);
  padding: 4px 8px;
  text-align: right;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
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
    width: 22px;
    height: 22px;
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
    width: 21px;
    height: 21px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    content: '';
  }

  .scheduleNum {
    position: absolute;
    bottom: 2px;
    right: 2px;
  }
`;
