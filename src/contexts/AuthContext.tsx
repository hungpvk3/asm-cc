import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { AuthReducer, AuthState } from '../reducers/AuthReducer'
import { AuthActionType } from '../reducers/type'
import setAuthToken from '../utils/setRequestDafaul'
import axios from 'axios'
import { apiAuth } from './api'


type AuthStateProp = {
    children: ReactNode
}

type authDataType = {
    username: string
    password: string
}

interface AuthConotextDataDefault {
    authState: AuthState
    login: (authData: authDataType) => Promise<object>
    register: (authData: authDataType) => Promise<object>
    loadUser: () => Promise<void>
    logout: () => void
}

const AuthContextData : AuthState = {
    isAuthenticated: false,
    user: ''
}

export const AuthContext = createContext<AuthConotextDataDefault>({
    authState: AuthContextData,
    login: () => Promise.resolve({}),
    register: () => Promise.resolve({}),
    loadUser: () => Promise.resolve(void 0),
    logout: () => {}
})

const AuthContextProvider = ({ children }: AuthStateProp) => {

    const [authState, dispatch] = useReducer(AuthReducer, AuthContextData)

    const { GET_USER, DELETE_USER } = AuthActionType

    const loadUser = async () => {
        const token = localStorage.getItem('token')

        if (token) {
            setAuthToken(token)
        }

        try {
            const res = await axios.get(apiAuth)

            if (res.data.success) {
                dispatch({ type: GET_USER, payload: res.data.user.username })
            }
        } catch (error) {
            dispatch({ type: DELETE_USER, payload: ''})
            console.log(error)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    const login = async (authData: authDataType) => {
        try {
            const res = await axios.post(`${apiAuth}/login`, authData)

            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
            }
            loadUser()
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const register = async (authData: authDataType) => {
        try {
            const res = await axios.post(`${apiAuth}/register`, authData)

            if (res.data.success)
                return res.data
        } catch (error) {
            console.log(error)
        }
    }


    const logout = () => {
        localStorage.removeItem('token')
        setAuthToken('')
        dispatch({ type: DELETE_USER, payload: ''})
    }

    const AuthContextDataDynamic = {
        authState,
        login,
        register,
        loadUser,
        logout
    }

    return <AuthContext.Provider value={AuthContextDataDynamic}>
        { children }
    </AuthContext.Provider>
}

export default AuthContextProvider
