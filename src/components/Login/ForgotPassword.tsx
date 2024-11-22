import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ForgotPasswordProps {
  onBackToLogin: () => void;  // Callback to navigate back to login page
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if at least one field is filled
    if (!email && !phone) {
      setSnackbarMessage('Please enter either your email or phone number.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Validate phone number format if provided
    if (phone && !/^\d{10}$/.test(phone)) {
      setSnackbarMessage('Please enter a valid 10-digit phone number.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Simulate an API call for password reset
      const response = await fetch('http://localhost:8080/api/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });

      if (response.ok) {
        setSnackbarMessage('Password reset link sent to your email or phone!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setEmail('');
        setPhone(''); // Reset fields
      } else {
        setSnackbarMessage('Failed to send password reset link.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('An error occurred. Please try again later.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-gradient-to-r rounded-[26px]">
          <div className="border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-8 md:p-6 sm:p-4 p-2">
            <h1 className="font-bold text-4xl text-center my-0">Forgot Password</h1>
            <p className="text-center text-gray-500 my-4">
              Enter your email or phone number to receive a password reset link.
            </p>
            <form className="space-y-4" onSubmit={handlePasswordReset}>
              <div>
                <label htmlFor="email" className="mb-2 text-lg">Email</label>
                <input
                  id="email"
                  className="border p-3 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center text-gray-500 font-medium">OR</div>
              <div>
                <label htmlFor="phone" className="mb-2 text-lg">Phone</label>
                <input
                  id="phone"
                  className="border p-3 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="Enter your 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-3 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                Send Reset Link
              </button>
            </form>
            <div className="text-center mt-4">
              <a
                href="#"
                className="text-blue-400 underline"
                onClick={onBackToLogin} // Trigger the back to login callback
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
