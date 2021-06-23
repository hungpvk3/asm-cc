import * as H from 'history'
import './style.css'
import { Grid } from '@material-ui/core'
import queryString  from 'query-string'
import { useContext } from 'react'
import { MoviesContext } from '../../../contexts/MoviesContext'
import { createStyles, Theme, makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme: Theme) => createStyles({
    nameVideo: {
        lineHeight: 3,
        fontSize: 20,
    },
    root: {
        display: 'flex',
        maxWidth: 365,
        maxHeight: 120,
        margin: '10px auto'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 150
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 200,
        height: 110,
        cursor: 'pointer',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}))

interface defaultProp {
    location: H.Location
}

const MovieWatch = ({ location }: defaultProp) => {
    // Style
    const classes = useStyle()


    // Query params
    const { v: movie } = queryString.parse(location.search)

    // Context
    const { moviesState } = useContext(MoviesContext)


    // Handle func
    const Movie = moviesState.find(mv => mv.video === movie)

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={8}>
                <iframe 
                    width="100%" 
                    height="600" 
                    src={`https://www.youtube.com/embed/${Movie?.video}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>

                <span className={classes.nameVideo}>{Movie?.name}</span>
                </Grid>
                <Grid item xs={4} className="scrolls">
                    {moviesState.map(movie => 
                        <Card className={classes.root} key={movie._id}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                <Typography variant="subtitle1" color="inherit">
                                    {movie.name}
                                </Typography>
                                </CardContent>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                title="Live from space album cover"
                            >
                                <Link to={`/watch?v=${movie.video}`}>
                                    <img src={`https://i.ytimg.com/vi/${movie.image}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAIdY0KJ0qmt5pXj7ku461QAb_rAA`} alt="" />
                                </Link>
                            </CardMedia>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}

export default MovieWatch
