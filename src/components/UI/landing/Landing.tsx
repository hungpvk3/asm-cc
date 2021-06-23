import React from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './landing.css'
import logo from '../../../asset/img/logo.png'
import mobile from '../../../asset/img/mobile.jpg'
import tv from '../../../asset/img/tv.png'
import boxshot from '../../../asset/img/boxshot.png'


const Landing = () => {
    // Context
    const { authState: {  isAuthenticated } } = React.useContext(AuthContext)


    return (
        <>
        <div className="showcase"> 
            <div className="showcase-top">
                <img src={logo} alt="NetFlix" />
                <Link to="/login" className="btn btn-rounded">{ isAuthenticated ? 'Go to home' : 'Sign In' }</Link>
            </div>  
            <div className="showcase-content">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <p>Watch anywhere. Cancel anytime.</p>
                <span>Ready to watch? Enter your email to create or restart your membership.</span>
                <div>
                    <input type="text" placeholder="Email Adress" />
                    <button className="btn btn-lg">Get Started <i className="fas fa-chevron-right icons"></i></button>
                </div>
            </div>
        </div>
    <div className="app-container">
        <div className="app-container-card-animation">
            <div className="app-container-card-text">
                <h1>Enjoy on your TV.</h1>
                <h2>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
            </div>
            <div className="app-container-card-image">
                <img src={tv} alt="TV Show" />
                <div className="app-container-card-image-video">
                    <video src="../../asset/img/video-tv-0819.m4v" autoPlay={true} playsInline={true} muted={true} loop={true} />
                </div>
            </div>
        </div>
    </div>
    <div className="app-container">
        <div className="app-container-wapper">
            <div className="app-container-wapper-left">
                <img src={mobile} alt="Mobie App" style={{maxWidth: 505}}/>
                <div className="app-container-wapper-left-content">
                    <img src={boxshot} alt="Box Shot" />
                   <div className="app-container-wapper-left-content-text">
                    <h4>Stranger Things</h4>
                    <h5>Downloading...</h5>
                    <div className="icon"><i className="fas fa-download"></i></div>
                   </div>
                </div>
            </div>
            <div className="app-container-wapper-right">
                <h1>Download your shows to watch offline.</h1>
                <h3>Save your favorites easily and always have something to watch</h3>
            </div>
        </div>
    </div>
    </>
    )
}

export default Landing
