import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Form } from 'react-bootstrap'
import { MoviesContext } from '../../../contexts/MoviesContext'
import { Grid, Container, TextField, Button } from '@material-ui/core'
import './style.css'


const AddMovieAdmin = () => {
    // State
    const [movieData, setMovieData] = useState({
        name: '',
        des: '',
        image: '',
        video: ''
    })
    const { name, des, image, video } = movieData

    // Context
    const { addMovie } = useContext(MoviesContext)

    // Handle func
    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setMovieData({ ...movieData, [event.target.name]: event.target.value })
    }

    const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const created = await addMovie(movieData)
            setMovieData({
                name: '',
                des: '',
                image: '',
                video: ''
            })
            console.log(created)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth="sm" className="div">
            <h3 style={{color: 'black'}}>Them movie yeu thich</h3>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Form style={{paddingTop: '50px'}} onSubmit={onSubmitForm}>
                        <Form.Group>
                            <TextField id="standard-basic" label="Name" name="name" onChange={onChangeInput} value={name} />
                        </Form.Group>
                        <Form.Group>
                            <TextField id="standard-basic" label="Description" name="des" onChange={onChangeInput} value={des} />
                        </Form.Group>
                        <Form.Group>
                            <TextField id="standard-basic" label="Image Link" name="image" onChange={onChangeInput} value={image} />
                        </Form.Group>
                        <Form.Group>
                            <TextField id="standard-basic" label="Video Link" name="video" onChange={onChangeInput} value={video} />
                        </Form.Group>
                        <Button variant="contained" color="primary" type="submit">
                            Them video
                        </Button>
                    </Form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AddMovieAdmin
