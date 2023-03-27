import styled from 'styled-components';

export const ScheduleDelete = styled.button`
  display: none;
  border: none;
  background-color: transparent;
  color: #ced4da;
  padding-left: 12px;
  font-size: 20px;
  &:hover {
    color: #ff6b6b;
  }
  &:active {
    color: #fa5252;
  }
`;

export const ScheduleDate = styled.div`
  font-size: 24px;
`;

export const ScheduleContent = styled.div`
  font-size: 20px;
`;

export const ScheduleList = styled.li`
  font-size: 24px;
  &:hover {
    ${ScheduleDelete} {
      display: inline-block;
    }
  }
`;
