import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setErrors] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { username, password }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, user)
            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
            }
        } catch (err) {
            setErrors(err.response.data.message)
        }
    }

    return (
        <div className="login">
            <h1>Admin Login</h1>
            {error && <span className="error-message">{error}</span>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} value={username} />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
