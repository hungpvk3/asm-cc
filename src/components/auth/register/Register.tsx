import { Form, Button } from 'react-bootstrap'
import { useContext, useState, ChangeEvent, FormEvent } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'



const Register = () => {
    // State
    const [authData, setAuthData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })


    // Context
    const { register } = useContext(AuthContext)



    // Handle
    const { username, password, confirmPassword } = authData
    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthData({ ...authData, [event.target.name]: event.target.value})
    }

    const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            // Message
            console.log('Password is incorrect')
            return
        }

        try {
            const registed = await register({username, password})

            console.log(registed)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
             <Form onSubmit={onSubmitForm}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Username" name="username" onChange={onChangeInput} style={{minWidth: 300}} required />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChangeInput} style={{minWidth: 300}} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Confim password" name="confirmPassword" onChange={onChangeInput} style={{minWidth: 300}} />
                </Form.Group>
                <Button variant="success" type="submit" className="form-submit">Register</Button>
            </Form>
            <p className="register">Please Login
            <Link to="/login" className="pl-3">
                <Button variant="info" size="sm" className="mt-2">Login</Button>
            </Link>
            </p>
        </div>
    )
}

export default Register
