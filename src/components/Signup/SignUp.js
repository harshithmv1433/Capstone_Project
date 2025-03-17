import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        if (!name.trim()) {
            tempErrors.name = "Name is required";
        }
        if (!email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!email.includes('@')) {
            tempErrors.email = "Email must contain @";
        }
        if (!password.trim()) {
            tempErrors.password = "Password is required";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!validate()) return;

        try {
            await axios.post('http://localhost:4000/users', {
                name,
                email,
                password,
                role: 'employee'
            });
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;