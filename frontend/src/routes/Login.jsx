import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';
import { useAuth } from '../AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        console.log("submit: " + email + " " + password);
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3005/api/login', {
                method: 'POST',
                credentials: 'include', // Ensure cookies are included
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            console.log(data);
            if (!response.ok) {
                setError(data.error || 'An unknown error occurred');
            } else {
                // Set authentication state with userId and email
                setAuth({ userId: data.userId, email: email });
                navigate('/borrow');
            }
        } catch (error) {
            setError('An error occurred while logging in');
            console.error('Error:', error);
        }
    };

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default Login;
