
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        let validationErrors = {};
        if (!email.trim()) {
            validationErrors.email = 'Email is Required';
        } else if (!email.includes('@')) {
            validationErrors.email = 'Email must contain @';
        }
        if (!password.trim()) validationErrors.password = 'Password is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:4000/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                const user = response.data[0];
                login(user);
                if (user.role === 'admin') {
                    navigate('/');
                } else {
                    navigate('/profiles');
                }
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div>   
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                {errors.login && <p style={{ color: 'red' }}>{errors.login}</p>}
                <button type="submit">Login</button>

            </form>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );
};

export default Login;