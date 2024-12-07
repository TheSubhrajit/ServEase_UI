import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ForgotPasswordProps {
  onBackToLogin: () => void; // Callback to navigate back to login page
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure fields are filled
    if (!emailOrUsername || !newPassword) {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Prepare data to send in the request body
      const requestData = {
        username: emailOrUsername,
        password: newPassword,
      };

      // Sending the POST request to update password API
      const response = await fetch('http://localhost:8443/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSnackbarMessage('Password updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setEmailOrUsername('');
        setNewPassword(''); // Reset fields
      } else {
        setSnackbarMessage('Failed to update password. Please try again.');
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
            <h1 className="font-bold text-4xl text-center my-0">Update Password</h1>
            <p className="text-center text-gray-500 my-4">
              Enter your email/username and new password to update your account.
            </p>
            <form className="space-y-4" onSubmit={handleUpdatePassword}>
              <div>
                <label htmlFor="emailOrUsername" className="mb-2 text-lg">Email/Username</label>
                <input
                  id="emailOrUsername"
                  className="border p-3 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="Enter your email or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="mb-2 text-lg">New Password</label>
                <input
                  id="newPassword"
                  className="border p-3 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-3 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                Update
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