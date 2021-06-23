import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import LoginForm from './Login'
import RegisterForm from '../register/Register'
import { Redirect } from 'react-router-dom'
import  './login.css'

interface LoginProp {
    auth: string
}

const Author = ({ auth }: LoginProp) => {
    //Context
    const { authState: { isAuthenticated, user } } = useContext(AuthContext) 


    let body

    if (isAuthenticated && user === 'kevin') {
        return <Redirect to='/store' />
    } else if (isAuthenticated && user !== 'kevin') {
        return <Redirect to='/home' />
    } else {
        body = (
            <>
                {auth === 'login' && <LoginForm />}
                {auth === 'register' && <RegisterForm />}
            </>
        )
    }


    return (
        <>
            <div className="main">
            <div  className="form">
            <h3 className="heading">{auth === 'login' ? 'Login' : 'Register Account'}</h3>
            <p className="desc">❤❤️❤</p>
        
            <div className="spacer"></div>
                { body }
            <span></span>
            
            </div>
        </div>
        </>
    )
}

export default Author
