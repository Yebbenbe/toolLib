import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    useEffect(() => {
        // Call the logout API
        fetch('http://localhost:3005/api/logout', {
            method: 'POST',
            credentials: 'include', // Ensure cookies are included
        })
            .then(() => {
                // Clear auth state
                setAuth(null);
                // Redirect to login page
                navigate('/login');
            })
            .catch(error => console.error('Error logging out:', error));
    }, [navigate, setAuth]);

    return <div>Logging out...</div>;
};

export default Logout;
