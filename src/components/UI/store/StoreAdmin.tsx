import { useContext } from 'react'
import { MoviesContext } from '../../../contexts/MoviesContext'
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Theme} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '../modal/Modal';
import { AuthContext } from '../../../contexts/AuthContext'
import { GlobalStateContext } from '../../../contexts/GlobalState'



const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    cardMedia: {
        maxWidth: 345,
        margin: '10px 26px'
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: 1200,
        margin: '0 auto',
        backgroundColor: '#f3f3f3'
    }
}))


const StoreAdmin = () => {
    // Styles
    const classes = useStyles()


    // State
    // const [movieUpdate, setMovieUpdate] = useState({
    //     name: '',
    //     des
    // })


    // Context
    const { moviesState, deleteMovie } = useContext(MoviesContext)
    const { setOpenModal, findMovie } = useContext(GlobalStateContext)
    const { logout } = useContext(AuthContext)


    // Handle 
    const handleOnpen = (id: string) => {
        setOpenModal(true)
        const result = moviesState.find(mv => mv._id === id)
        if (result) {
            const { _id, name, des, image, video } = result
            findMovie({_id, name, des, image, video})
        }
    }

    return (
        <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Managent Movies
                </Typography>
                    <Button variant="contained" onClick={logout}>Log Out</Button>
                </Toolbar>
            </AppBar>
        </div>
        <div className={classes.cardContainer}>
            {/* ===Start=== */}

            {moviesState.map(movie => (
                <Card className={classes.cardMedia} key={movie._id}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={`https://i.ytimg.com/vi/${movie.image}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAIdY0KJ0qmt5pXj7ku461QAb_rAA`}
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {movie.name}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained" onClick={() => handleOnpen(movie._id)}>
                            Edit
                        </Button>
                        <Button size="small" color="primary" variant="contained" onClick={deleteMovie.bind(this, movie._id)}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}
            
            {/* ====End===== */}
        </div>
        <Modal />
        </>
    )
}

export default StoreAdmin
