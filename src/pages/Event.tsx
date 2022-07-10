import React, { FC, useCallback, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import { Button, Modal, Row } from "antd";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const { fetchGuests, createEvent, fetchEvents } = useActions();
	const { guests, events } = useTypedSelector(state => state.event);
	const { user } = useTypedSelector(state => state.auth);

	useEffect(() => {
		fetchGuests();
		fetchEvents(user.username)
	}, []);

	const closeModal = () => setModalVisible(false);

	const addNewEvent = (event: IEvent) => {
		createEvent(event)
		closeModal()
	};

	return (
		<>
			<EventCalendar events={events}/>
			<Row justify={"center"}>
				<Button
					onClick={() => setModalVisible(true)}
				>
					Add Event
				</Button>
			</Row>
			<Modal title='Add Event' visible={modalVisible} footer={null} onCancel={closeModal}>
				<EventForm guests={guests} submit={addNewEvent}/>
			</Modal>
		</>
	);
};

export default Event;