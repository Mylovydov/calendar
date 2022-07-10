import { EventActionsEnum, ISetEventsAction, ISetGuestsAction } from "./types";
import { IUser } from "../../../models/IUser";
import { IEvent } from "../../../models/IEvent";
import { AppDispatch } from "../../index";
import UserService from "../../../api/UserService";


export const EventActionCreators = {
	setGuests: (payload: IUser[]): ISetGuestsAction => ({ type: EventActionsEnum.SET_GUESTS, payload }),
	setEvents: (payload: IEvent[]): ISetEventsAction => ({ type: EventActionsEnum.SET_EVENTS, payload }),
	fetchGuests: () => async (dispatch: AppDispatch) => {
		try {
			const response = await UserService.getUsers()
			dispatch(EventActionCreators.setGuests(response.data))
		} catch (err) {
			console.log(err);
		}
	},
	createEvent: (event: IEvent) => (dispatch: AppDispatch) => {
		try {
			const events = localStorage.getItem("events") || '[]'
			const json = JSON.parse(events) as IEvent[]
			json.push(event)
			dispatch(EventActionCreators.setEvents(json))
			localStorage.setItem("events", JSON.stringify(json))
		} catch (err) {
			console.log(err);
		}
	},
	fetchEvents: (username: string) => (dispatch: AppDispatch) => {
		try {
			const events = localStorage.getItem("events") || '[]'
			const json = JSON.parse(events) as IEvent[]
			const currentUserEvents = json.filter(ev => ev.author === username || ev.quest === username)
			dispatch(EventActionCreators.setEvents(currentUserEvents))
		} catch (err) {
			console.log(err);
		}
	}
};