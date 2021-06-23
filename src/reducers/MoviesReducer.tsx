import { MoviesActionType } from './type'

export interface Movies {
    _id: string,
    name: string,
    des: string,
    image: string,
    video: string,
    user: string,
}

type MoviesState = Movies[]


const { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, EDIT_MOVIE } = MoviesActionType
type MoviesAction = | {
    type: typeof GET_MOVIES,
    payload: Movies[]
}
| {
    type: typeof ADD_MOVIE,
    payload: Movies[]
}
| {
    type: typeof DELETE_MOVIE,
    payload: string
}
| {
    type: typeof EDIT_MOVIE,
    payload: Movies
}
export const MoviesReducer = (state: MoviesState, action: MoviesAction) => {

    switch(action.type) {
        case 'GET_MOVIES':
            return action.payload
        case 'ADD_MOVIE':
            return action.payload
        case 'DELETE_MOVIE':
            return state.filter(movies => movies._id !== action.payload)
        case 'EDIT_MOVIE':
            return state.map(movie => movie._id === action.payload._id ? action.payload : movie)
        default:
            return state
    }

}