import React, { useCallback, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdDelete } from 'react-icons/md';
import * as S from 'components/ScheduleListModal/ScheduleListModalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { removeSchedules } from 'store/schedules';
import { RootState } from 'store/store';

interface Props {
  schuleListModal: boolean;
  setScheduleListModal: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Date;
}

function ScheduleListModal({
  schuleListModal,
  setScheduleListModal,
  selected,
}: Props) {
  const schedules = useSelector((state: RootState) => state.schedules);
  const dispatch = useDispatch();

  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() >= 9
      ? selected.getMonth() + 1
      : `0${selected.getMonth() + 1}`
  }-${
    selected.getDate() >= 10 ? selected.getDate() : `0${selected.getDate()}`
  }`;

  const schuleListModalClose = useCallback(() => {
    setScheduleListModal(false);
  }, [setScheduleListModal]);

  const scheduleRemove = (
    e: React.MouseEvent<HTMLButtonElement | SVGElement>,
  ) => {
    dispatch(removeSchedules(e.currentTarget.dataset.id));
  };

  useEffect(() => {
    schedules.length === 0 && schuleListModalClose();
  }, [schedules, schuleListModalClose, selectedDate]);

  return (
    <Modal
      show={schuleListModal}
      onHide={schuleListModalClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Registered Schedules
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '50vh', overflowY: 'auto' }}>
        <ol>
          {schedules.map((schedule) => (
            <S.ScheduleList key={schedule.id}>
              <S.ScheduleDate>{schedule.date}</S.ScheduleDate>
              <S.ScheduleContent>
                - {schedule.content}
                <S.ScheduleDelete
                  data-id={schedule.id}
                  onClick={scheduleRemove}
                >
                  <MdDelete data-id={schedule.id} onClick={scheduleRemove} />
                </S.ScheduleDelete>
              </S.ScheduleContent>
            </S.ScheduleList>
          ))}
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={schuleListModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScheduleListModal;
