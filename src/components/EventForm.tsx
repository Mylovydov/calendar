import React, { FC, useState } from "react";
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/data";

interface IEventFormProps {
	guests: IUser[];
	submit: (event: IEvent) => void;
}

const EventForm: FC<IEventFormProps> = ({ guests, submit }) => {
	const [event, setEvent] = useState<IEvent>({
		date: "",
		quest: "",
		description: "",
		author: ""
	} as IEvent);

	const { user } = useTypedSelector(state => state.auth);

	const onChangeEventField = (key: string, value: string) => {
		setEvent(event => ({ ...event, [key]: value }));
	};

	const selectDate = (date: Moment | null) => {
		if (date) {
			onChangeEventField("date", formatDate(date?.toDate()));
		}
	};

	const clearState = () => {
		console.log('clearState');
		setEvent({
			date: "",
			quest: "",
			description: "",
			author: ""
		} as IEvent)
	}
	console.log('event', event);
	const submitForm = () => {
		submit({ ...event, author: user.username });
		clearState()
	};
	return (
		<Form onFinish={submitForm}>
			<Form.Item
				label='Event Description'
				name='description'
				rules={[rules.required()]}
			>
				<Input
					value={event.description}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEventField("description", e.target.value)}
				/>
			</Form.Item>

			<Form.Item
				label='Date of event'
				name='date'
				rules={[rules.required(), rules.isDateAfter('It is impossible to create an event in the past')]}
			>
				<DatePicker
					onChange={(date) => selectDate(date)}
				/>
			</Form.Item>

			<Form.Item
				label='Select guest'
				name='quest'
				rules={[rules.required()]}
			>
				<Select onChange={(guest: IEvent["quest"]) => onChangeEventField("quest", guest)}>
					{guests.map(guest =>
						<Select.Option
							key={guest.password + guest.username}
							value={guest.username}
						>
							{guest.username}
						</Select.Option>)}
				</Select>
			</Form.Item>

			<Row justify={"end"}>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Create Event
					</Button>
				</Form.Item>
			</Row>
		</Form>
	);
};

export default EventForm;