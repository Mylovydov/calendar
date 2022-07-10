import { IUser } from "../../../models/IUser";
import { IEvent } from "../../../models/IEvent"

export enum EventActionsEnum {
	SET_GUESTS = "SET_GUESTS",
	SET_EVENTS = "SET_EVENTS"
}

export interface IEventState {
	guests: IUser[];
	events: IEvent[];
}

export interface ISetGuestsAction {
	type: EventActionsEnum.SET_GUESTS;
	payload: IUser[];
}

export interface ISetEventsAction {
	type: EventActionsEnum.SET_EVENTS;
	payload: IEvent[];
}

export type TEventAction = ISetGuestsAction | ISetEventsAction