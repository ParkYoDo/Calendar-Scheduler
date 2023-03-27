import React, { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addSchedules } from '../../store/schedules';

function RegisterModal({
  registerModal,
  setRegisterModal,
  setScheduleModal,
  selected,
}) {
  const dispatch = useDispatch();

  const scheduleId = useRef(0);

  const selectedDate = `${selected.getFullYear()}-${
    selected.getMonth() >= 9
      ? selected.getMonth() + 1
      : '0' + (selected.getMonth() + 1)
  }-${
    selected.getDate() >= 10 ? selected.getDate() : '0' + selected.getDate()
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
      content: ``,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ date: selectedDate, [name]: value });
  };

  const onSubmit = () => {
    dispatch(addSchedules({ id: scheduleId.current, ...input }));
    scheduleId.current += 1;
    registerModalClose();
    setScheduleModal(true);
  };

  const onKeyDown = (e) => {
    e.key === 'Enter' && onSubmit();
  };

  return (
    <>
      <Modal show={registerModal} onHide={registerModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shedule Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Selected Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                disabled
                value={selectedDate}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Schedule</Form.Label>
              <Form.Control
                name="content"
                value={content}
                onChange={onChange}
                as="textarea"
                rows={3}
                autoFocus
                onKeyDown={onKeyDown}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSubmit}>
            Save changes
          </Button>
          <Button variant="secondary" onClick={registerModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;
