import styled from 'styled-components';

export const ScheduleDelete = styled.div`
  display: none;
  color: #ced4da;
  margin-left: 12px;
  font-size: 20px;
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
      display: block;
    }
  }
`;

export const ScheduleContent = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
