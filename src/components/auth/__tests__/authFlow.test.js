import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../context/AuthContext';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';
import ProtectedRoute from '../ProtectedRoute';

const renderWithProviders = (ui) => {
    return render(<AuthProvider><BrowserRouter>{ui}</BrowserRouter></AuthProvider>);
};

test('User can register, log in, and access protected route', async () => {
    // Render the registration form
    renderWithProviders(<RegisterForm />);

    // Fill out and submit the registration form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/sector/i), { target: { value: 'Technology' } });
    fireEvent.change(screen.getByLabelText(/project description/i), { target: { value: 'Test Project' } });
    fireEvent.click(screen.getByText(/register/i));

    // Check if the user is registered (mocked console log)
    expect(console.log).toHaveBeenCalledWith('Form submitted:', {
        name: 'Test User',
        email: 'test@example.com',
        sector: 'Technology',
        projectDescription: 'Test Project'
    });

    // Render the login form
    renderWithProviders(<LoginForm />);

    // Fill out and submit the login form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/login/i));

    // Check if the user is logged in (mocked console log)
    expect(console.log).toHaveBeenCalledWith('User logged in:', { email: 'test@example.com' });

    // Render a protected route
    renderWithProviders(
        <ProtectedRoute>
            <div>Protected Content</div>
        </ProtectedRoute>
    );

    // Check if the protected content is displayed
    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
});