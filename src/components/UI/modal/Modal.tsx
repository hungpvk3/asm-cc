import { TextField, Button, Modal, Fade, Backdrop } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core';
import { Form } from 'react-bootstrap'
import { useContext, useState, FormEvent , useEffect} from 'react'
import { GlobalStateContext } from '../../../contexts/GlobalState'
import { ChangeEvent } from 'react';
import { MoviesContext } from '../../../contexts/MoviesContext'

const useStyles = makeStyles((theme: Theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 600
    },
}))


const ModalComponent = () => {
    // Style
    const classes = useStyles()

    // COntext
    const { openModal, setOpenModal, movie } = useContext(GlobalStateContext)
    const { updateMovie } = useContext(MoviesContext)


    // State
    const [data, setData] = useState(movie)

    
    // Handle
    useEffect(() => {
        setData({...movie})
    }, [movie])

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [event.target.name]: event.target.value})
    }

    
    const onSubmitUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const updated = await updateMovie(data)
        if (updated.success) {
            setOpenModal(false)
        }
    }


    return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={setOpenModal.bind(this, false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
        }}
        >
            <Fade in={openModal}>
                <Form style={{paddingTop: '50px'}} className={classes.paper} onSubmit={onSubmitUpdate}>
                    <Form.Group>
                        <TextField id="standard-basic" label="Name" name="name" value={data.name} onChange={onChangeInput} />
                    </Form.Group>
                    <Form.Group>
                        <TextField id="standard-basic" label="Description" name="des" value={data.des} onChange={onChangeInput} />
                    </Form.Group>
                    <Form.Group>
                        <TextField id="standard-basic" label="Image Link" name="image" value={data.image} onChange={onChangeInput} />
                    </Form.Group>
                    <Form.Group>
                        <TextField id="standard-basic" label="Video Link" name="video" value={data.video} onChange={onChangeInput} />
                    </Form.Group>
                    <Button variant="contained" color="primary" type="submit" >
                        Chỉnh Sửa
                    </Button>
                </Form>
            </Fade>
        </Modal>
        </div>
    )
}

export default ModalComponent
