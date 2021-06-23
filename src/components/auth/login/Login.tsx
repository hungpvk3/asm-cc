import { useContext, useState, ChangeEvent, FormEvent } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Login = () => {

    // State
    const [authData, setAuthData] = useState({
        username: '',
        password: ''
    })


    // Context
    const { login } = useContext(AuthContext)



    // Handeler
    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthData({ ...authData, [event.target.name]: event.target.value })
    }

    const onLoginForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const logined = await login(authData)

            console.log(logined)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={onLoginForm}>
                <Form.Group>
                    <Form.Control type="text" name="username" placeholder="Username" onChange={onChangeInput} required style={{minWidth: 300}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={onChangeInput} style={{minWidth: 300}} />
                </Form.Group>

                <Button variant="success" type="submit" className="form-submit">Login</Button>
            </Form>
            <p className="register">Don't have account ?
            <Link to="/register" className="">
                <Button variant="info" size="sm" className="mt-2 pl-2">Register</Button>
            </Link>
            </p>
        </>
    )
}

export default Login
