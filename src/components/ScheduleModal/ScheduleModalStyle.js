import styled from 'styled-components';

export const ScheduleDelete = styled.div`
  display: none;
  color: #ced4da;
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
