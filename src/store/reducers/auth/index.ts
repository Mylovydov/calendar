import { AuthActionsEnum, IAuthState, TAuthAction } from "./types";
import { IUser } from "../../../models/IUser";

const initialState: IAuthState = {
	isAuth: false,
	user: {} as IUser,
	isLoading: false,
	error: ""
};

const authReducer = (state = initialState, action: TAuthAction): IAuthState => {
	switch (action.type) {
		case AuthActionsEnum.SET_AUTH:
			return { ...state, isAuth: action.payload, isLoading: false };
		case AuthActionsEnum.SET_USER:
			return { ...state, user: action.payload };
		case AuthActionsEnum.SET_ERROR:
			return { ...state, error: action.payload, isLoading: false };
		case AuthActionsEnum.SET_IS_LOADING:
			return { ...state, isLoading: action.payload };
		default:
			return state;
	}
};

export default authReducer;