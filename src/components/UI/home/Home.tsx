import React, { useContext, useEffect } from 'react'
import { MoviesContext } from '../../../contexts/MoviesContext'
import { AuthContext } from '../../../contexts/AuthContext'
import './home.css'
import logo from '../../../asset/img/logo.png'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import MovieWatch from '../movies/MovieWatch'



const Home = () => {
    // Context
    const { logout } = useContext(AuthContext)
    const { moviesState } = useContext(MoviesContext)
    
    return (
        <div className="wrapper">
            <div className="header">
                <div className="netflixLogo">
                    <div id="logo"><img src={logo} alt="Logo" /></div>
                </div>      
                <nav className="main-nav">                
                    <span >Home</span>
                    <span >TV Shows</span>
                    <span >Movies</span>
                    <span >Originals</span>
                    <span >Recently Added</span>
                    <span >Portfolio</span>        
                </nav>
                <nav className="sub-nav">
                    <Button onClick={logout.bind(this)}>Log Out</Button>       
                </nav>      
            </div>
           
            <section className="main-container" >
                <div className="location" id="home">
                    <h1 id="home">Popular on Netflix</h1>
                    <div className="box">
                        {moviesState.map(movie => 
                            <span key={movie._id}>
                                <Link to={`/watch?v=${movie.video}`}>
                                    <img src={`https://i.ytimg.com/vi/${movie.image}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAIdY0KJ0qmt5pXj7ku461QAb_rAA`} alt="" />
                                </Link>
                                <p>{movie.name}</p>
                            </span>      
                        )}
                    </div>
                </div>
                
            </section>

            <section className="link">
                <div className="sub-links">
                    <ul>
                        <li><span>Audio and Subtitles</span></li>
                        <li><span>Audio Description</span></li>
                        <li><span>Help Center</span></li>
                        <li><span>Gift Cards</span></li>
                        <li><span>Media Center</span></li>
                        <li><span>Investor Relations</span></li>
                        <li><span>Jobs</span></li>
                        <li><span>Terms of Use</span></li>
                        <li><span>Privacy</span></li>
                        <li><span>Legal Notices</span></li>
                        <li><span>Corporate Information</span></li>
                        <li><span>Contact Us</span></li>
                    </ul>
                </div>
            </section>

            <footer>
                <p>&copy 1997-2018 Netflix, Inc.</p>
                <p>Carlos Avila &copy 2018</p>
            </footer>
        </div>
    )
}

export default Home
