import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdDelete } from 'react-icons/md';
import * as S from './ScheduleListModalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { removeSchedules } from '../../store/schedules';

function ScheduleListModal({
  schuleListModal,
  setScheduleListModal,
  selected,
}) {
  const schedules = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() >= 9
      ? selected.getMonth() + 1
      : '0' + (selected.getMonth() + 1)
  }-${
    selected.getDate() >= 10 ? selected.getDate() : '0' + selected.getDate()
  }`;

  const schuleListModalClose = () => {
    setScheduleListModal(false);
  };

  const scheduleRemove = (e) => {
    dispatch(removeSchedules(e.target.dataset.id));
  };

  useEffect(() => {
    schedules.filter((schedule) => schedule.date === selectedDate).length ===
      0 && schuleListModalClose();
  });

  return (
    <>
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
            {schedules.map((schedule, i) => (
              <S.ScheduleList key={schedule.id}>
                {schedule.date}
                <p>
                  - {schedule.content}
                  <S.ScheduleDelete>
                    <MdDelete data-id={schedule.id} onClick={scheduleRemove} />
                  </S.ScheduleDelete>
                </p>
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
    </>
  );
}

export default ScheduleListModal;
