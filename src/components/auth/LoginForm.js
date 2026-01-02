import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: 'linear-gradient(135deg, #0033a0, #fcd116, #20603d)', // Blue, Yellow, Green
                padding: '20px',
                borderRadius: '8px',
                color: '#fff',
            }}
        >
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #0033a0',
                    }}
                />
            </div>
            <button
                type="submit"
                style={{
                    background: '#fcd116',
                    color: '#0033a0',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;