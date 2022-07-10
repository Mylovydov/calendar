import { AuthActionsEnum, ISetAuthAction, ISetErrorAction, ISetIsLoadingAction, ISetUserAction } from "./types";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../index";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
	setUser: (user: IUser): ISetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
	setAuth: (isAuth: ISetAuthAction['payload']) : ISetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: isAuth}),
	setError: (message: ISetErrorAction['payload']) : ISetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload: message}),
	setIsLoading: (isLoading: ISetIsLoadingAction['payload']) : ISetIsLoadingAction => ({ type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading}),
	login: (username: IUser['username'], password: IUser['password']) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true))
			setTimeout(async () => {
				const response = await UserService.getUsers()
				const mockUser = response.data.find(user => user.password === password && user.username === username)

				if (mockUser) {
					localStorage.setItem('auth', 'true')
					localStorage.setItem('username', mockUser.username)
					dispatch(AuthActionCreators.setUser(mockUser))
					dispatch(AuthActionCreators.setAuth(true))
				} else {
					dispatch(AuthActionCreators.setError('Not found user'))
				}
				dispatch(AuthActionCreators.setIsLoading(false))
			}, 1000)
		} catch (e) {
			dispatch(AuthActionCreators.setError('Whats wrong'))
		}
	},
	logout: () => async (dispatch: AppDispatch) => {
		localStorage.removeItem('auth')
		localStorage.removeItem('username')
		dispatch(AuthActionCreators.setUser({} as IUser))
		dispatch(AuthActionCreators.setAuth(false))
	}
};