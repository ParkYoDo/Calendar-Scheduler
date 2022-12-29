import styled from 'styled-components';

export const ScheduleDelete = styled.button`
  display: none;
  border: none;
  background-color: transparent;
  color: #ced4da;
  padding-left: 5px;
  &:hover {
    color: #ff6b6b;
  }
  &:active {
    color: #fa5252;
  }
`;

export const ScheduleList = styled.li`
  &:hover {
    ${ScheduleDelete} {
      display: inline-block;
    }
  }
`;
