import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.css'

const NotFoundPage = () => {

    // COntext
    const { authState: { isAuthenticated, user } } = useContext(AuthContext)


    return (
        <>
            <div className="error">404</div>
                <br /><br />
                <span className="info">File not found</span>
            <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" className="static" />
            <Button className="go-back-home">
                {isAuthenticated && user !== 'kevin' ? <Link to="/home">Go back home</Link> : <Link to="/login">Go back</Link>}
            </Button>
        </>
    )
}

export default NotFoundPage
