import { GlobalActionType } from './type'

export type GlobalState = {
    _id: string,
        name: string,
        des: string,
        image: string,
        video: string
}

const { FIND_MOVIE } = GlobalActionType
type globalActionType = {
    type: typeof FIND_MOVIE,
    payload: GlobalState
}

export const GlobalReducer = (state: GlobalState, action: globalActionType) => {
    switch (action.type) {
        case 'FIND_MOVIE':
            return action.payload
        default: return state
    }
}