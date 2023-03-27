import React, { useEffect } from 'react';
import * as S from 'components/ScheduleModal/ScheduleModalStyle';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { removeSchedules } from 'store/schedules';
import { RootState } from 'store/store';

interface Props {
  scheduleModal: boolean;
  setScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Date;
}

function ScheduleModal({
  scheduleModal,
  setScheduleModal,
  setRegisterModal,
  selected,
}: Props) {
  const schedules = useSelector((state: RootState) => state.schedules);
  const dispatch = useDispatch();

  const scheduleModalClose = () => {
    setScheduleModal(false);
  };

  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() >= 9
      ? selected.getMonth() + 1
      : `0${selected.getMonth() + 1}`
  }-${
    selected.getDate() >= 10 ? selected.getDate() : `0${selected.getDate()}`
  }`;

  const registerModalOpen = () => {
    setRegisterModal(true);
    scheduleModalClose();
  };

  const scheduleRemove = (e: React.MouseEvent<HTMLDivElement | SVGElement>) => {
    dispatch(removeSchedules(e.currentTarget.dataset.id));
  };

  useEffect(() => {
    schedules.filter((schedule) => schedule.date === selectedDate).length ===
      0 && scheduleModalClose();
  });
  return (
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
            (schedule) =>
              schedule.date === selectedDate && (
                <S.ScheduleList key={schedule.id}>
                  <S.ScheduleContent>
                    {schedule.content}{' '}
                    <S.ScheduleDelete
                      data-id={schedule.id}
                      onClick={scheduleRemove}
                    >
                      <MdDelete
                        data-id={schedule.id}
                        onClick={scheduleRemove}
                      />
                    </S.ScheduleDelete>
                  </S.ScheduleContent>
                </S.ScheduleList>
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
  );
}

export default ScheduleModal;
