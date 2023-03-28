import React, { useRef, useState } from 'react';
import * as S from 'components/RegisterModal/RegisterModalStyle';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedules } from 'store/schedules';
import { RootState } from 'store/store';

interface Props {
  registerModal: boolean;
  setRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Date;
}

function RegisterModal({
  registerModal,
  setRegisterModal,
  setScheduleModal,
  selected,
}: Props) {
  const dispatch = useDispatch();
  const schedules = useSelector((state: RootState) => state.schedules);

  const scheduleId = useRef<number>(schedules.length + 1);
  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() >= 9
      ? selected.getMonth() + 1
      : `0${selected.getMonth() + 1}`
  }-${
    selected.getDate() >= 10 ? selected.getDate() : `0${selected.getDate()}`
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
      content: '',
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInput({ date: selectedDate, content: value });
  };

  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) {
      alert('일정을 입력하세요');
    } else {
      dispatch(addSchedules({ id: scheduleId.current, ...input }));
      scheduleId.current += 1;
      registerModalClose();
      setScheduleModal(true);
    }
  };

  const onKeyDown = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLFormElement>,
  ) => {
    (e as React.KeyboardEvent<HTMLTextAreaElement>).key === 'Enter' &&
      onSubmit(e as React.MouseEvent<HTMLFormElement>);
  };

  return (
    <Modal show={registerModal} onHide={registerModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shedule Calendar</Modal.Title>
      </Modal.Header>
      <S.RegisterForm onSubmit={onSubmit}>
        <Modal.Body>
          <S.RegisterTitle>Selected Date</S.RegisterTitle>
          <S.RegisterDate type="date" disabled value={selectedDate} />
          <S.RegisterTitle>Enter Schedule</S.RegisterTitle>
          <S.RegisterInput
            name="content"
            value={content}
            onChange={onChange}
            as="textarea"
            rows={3}
            autoFocus
            onKeyDown={onKeyDown}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            Save changes
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={registerModalClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </S.RegisterForm>
    </Modal>
  );
}

export default RegisterModal;
