import React from 'react';
import * as S from './ScheduleModalStyle';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { removeSchedules } from '../../store/schedules';

function ScheduleModal({
  scheduleModal,
  setScheduleModal,
  setRegisterModal,
  selected,
}) {
  const schedules = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  const scheduleModalClose = () => {
    setScheduleModal(false);
  };

  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() >= 9
      ? selected.getMonth() + 1
      : '0' + (selected.getMonth() + 1)
  }-${
    selected.getDate() >= 10 ? selected.getDate() : '0' + selected.getDate()
  }`;

  const registerModalOpen = () => {
    setRegisterModal(true);
    scheduleModalClose();
  };

  const scheduleRemove = (e) => {
    dispatch(removeSchedules(e.target.dataset.id));
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
                schedule.date === selectedDate && (
                  <S.ScheduleList key={i}>
                    {schedule.content}
                    <S.ScheduleDelete>
                      <MdDelete
                        data-id={schedule.id}
                        onClick={scheduleRemove}
                      />
                    </S.ScheduleDelete>
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
    </>
  );
}

export default ScheduleModal;
