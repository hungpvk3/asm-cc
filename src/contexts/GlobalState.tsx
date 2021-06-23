import { useReducer, createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react'
import { GlobalReducer } from '../reducers/GlobalReducer'
import { GlobalState } from '../reducers/GlobalReducer'
import { GlobalActionType } from '../reducers/type'


interface GlobalStateProp {
    children: ReactNode
}


interface GlobalStateData {
    movie: GlobalState
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    findMovie: ({name, des, image, video}: GlobalState) => void
}


const GlobalStateDataDefault = {
    _id: '',
    name: '',
    des: '',
    image: '',
    video: ''
}

export const GlobalStateContext = createContext<GlobalStateData>({
    movie: GlobalStateDataDefault,
    openModal: false,
    setOpenModal: () => false,
    findMovie: () => {}
})


const GlobalStateProvider = ({ children }: GlobalStateProp) => {
    const [movie, dispatch] = useReducer(GlobalReducer, GlobalStateDataDefault)
    const [openModal, setOpenModal] = useState(false)
    // console.log(movie)
    const { FIND_MOVIE } = GlobalActionType
    const findMovie = ({ _id = '', name = '', des = '', image = '', video = ''}) => {
        dispatch({ type: FIND_MOVIE, payload: { _id, name, des, image, video}})
    }
    
    const globalStateDataDefault = {
        openModal,
        setOpenModal,
        movie,
        findMovie     
    }

    return <GlobalStateContext.Provider value={globalStateDataDefault}>
        { children }
    </GlobalStateContext.Provider>
}

export default GlobalStateProvider