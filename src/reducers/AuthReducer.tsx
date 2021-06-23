import { AuthActionType } from './type'

export interface AuthState {
    isAuthenticated: boolean
    user: string
}

type ActionType = | {
    type: typeof AuthActionType.GET_USER
    payload: string
} | {
    type: typeof AuthActionType.DELETE_USER
    payload: string
}

export const AuthReducer = (state: AuthState, action: ActionType) => {
    switch (action.type) {

        case 'GET_USER':
            return {isAuthenticated: true, user: action.payload}

        case 'DELETE_USER':
            return {isAuthenticated: false, user: action.payload}
        default:
            return state
    }
}