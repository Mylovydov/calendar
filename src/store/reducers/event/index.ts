import { EventActionsEnum, IEventState, TEventAction } from "./types";

const initialState: IEventState = {
	guests: [],
	events: []
};

const eventReducer = (state = initialState, action: TEventAction): IEventState => {
	switch (action.type) {
		case EventActionsEnum.SET_GUESTS:
			return { ...state, guests: action.payload };
		case EventActionsEnum.SET_EVENTS:
			return { ...state, events: action.payload };
		default:
			return state;
	}
};
export default eventReducer;