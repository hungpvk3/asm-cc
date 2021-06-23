import { useReducer, createContext, ReactNode, useEffect } from "react"
import { MoviesReducer, Movies } from '../reducers/MoviesReducer'
import { MoviesActionType } from '../reducers/type'
import axios from 'axios'
import { api } from './api'


interface MoviesContextProp {
    children: ReactNode
}

interface movieData {
    name: string,
    des: string,
    image: string,
    video: string,
}

interface resolveReturn {
    success: boolean
    message: string
    movie: object
}

interface updateMovie {
    _id: string,
    name: string,
    des: string,
    image: string,
    video: string,
}

interface MoviesState {
    moviesState: Movies[]
    addMovie: (movieData: movieData) => Promise<object>
    getMovies: () => Promise<object>
    deleteMovie: (id: string) => void
    updateMovie: (obj: updateMovie) => Promise<resolveReturn>
}

const MoviesDataDefault = {
    moviesState: [],
    addMovie: () => Promise.resolve({}),
    getMovies: () => Promise.resolve({}),
    deleteMovie: () => {},
    updateMovie: () => Promise.resolve({
        success: false,
        message: '',
        movie: {},
    })
}


export const MoviesContext = createContext<MoviesState>(MoviesDataDefault)

const MoviesContextProvider = ({ children }: MoviesContextProp) => {

    const [moviesState, dispatch] = useReducer(MoviesReducer, MoviesDataDefault.moviesState)

    const { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, EDIT_MOVIE } = MoviesActionType
    const getMovies = async () => {
        try {
            const res = await axios.get(api)

            if (res.data.success) {
                dispatch({ type: GET_MOVIES, payload: res.data.movies})
            }

            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    const addMovie = async (movieData: movieData) => {
        try {
            const res = await axios.post(`${api}/create`, movieData)

            if (res.data.success) {
                dispatch({ type: ADD_MOVIE, payload: [...moviesState, res.data.movie] })
            } 

            return res.data
        } catch (error) {
            console.log(error)
        }
    }


    const deleteMovie = async (id: string) => {
        try {
            const res = await axios.delete(`${api}/destroy/${id}`)

            if (res.data.success) {
                dispatch({ type: DELETE_MOVIE, payload: res.data.movie._id})
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateMovie = async (obj: updateMovie) => {
        try {
            const res = await axios.put(`${api}/update/${obj._id}`, obj)

            if (res.data.success) {
                dispatch({ type: EDIT_MOVIE, payload: res.data.movie })
            }
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const moviesDataDefault = {
        moviesState,
        getMovies,
        addMovie,
        deleteMovie,
        updateMovie
    }

    return <MoviesContext.Provider value={moviesDataDefault}>
        { children }
    </MoviesContext.Provider>
}

export default MoviesContextProvider
