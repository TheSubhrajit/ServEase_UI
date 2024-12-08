import React, { useState } from 'react';
import Registration from "../Registration/Registration";
import ServiceProviderRegistration from "../Registration/ServiceProviderRegistration";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Landingpage } from '../Landing_Page/Landingpage';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import ForgotPassword from './ForgotPassword';
import DetailsView from '../DetailsView/DetailsView';
import ServiceProviderDashboard from '../DetailsView/ServiceProviderDashboard';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [isServiceRegistration, setServiceRegistration] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirectComponent, setRedirectComponent] = useState<React.ReactNode | null>(null);
  const handleSignUpClick = () => {
    setIsRegistration(true);
  };

  const handleBackToLogin = () => {
    setIsRegistration(false);
    setIsForgotPassword(false);
  };

  const handleSignUpClickServiceProvider = () => {
    setServiceRegistration(true);
  };

  const handleProviderBackToLogin = () => {
    setServiceRegistration(false);
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleSnackbarClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dummy user credentials check
      if (email === "user@example.com" && password === "password123") {
        setSnackbarMessage("User logged in successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          setRedirectComponent(
            <DetailsView sendDataToParent={(data: string) => console.log(data)} />
          );
        }, 1000);
        return;
      }
  
      // For other users, make the API call
      const requestData = {
        username: email,
        password: password,
      };

      const response = await fetch('http://localhost:8443/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();

      if (data.message === "Login successful!") {
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Redirect based on role
        setTimeout(() => {
          if (data.role === "SERVICE_PROVIDER") {
            setRedirectComponent(<ServiceProviderDashboard />);
          } else {
            setRedirectComponent(
              <DetailsView sendDataToParent={function (data: string): void {
                throw new Error('Function not implemented.');
              }} />
            );
          }
        }, 1000);
      } else {
        setSnackbarMessage("Login failed. Please check your credentials.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbarMessage('An error occurred during login.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  if (redirectComponent) {
    return <>{redirectComponent}</>;
  }

  if (isForgotPassword) {
    return <ForgotPassword onBackToLogin={handleBackToLogin} />;
  }

  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-0">
          <div className="border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-8 md:p-6 sm:p-4 p-2 m-0">
            {isRegistration ? (
              <Registration onBackToLogin={handleBackToLogin} />
            ) : isServiceRegistration ? (
              <ServiceProviderRegistration onBackToLogin={handleBackToLogin} />
            ) : (
              <>
                <h1 className="font-bold dark:text-gray-400 text-4xl text-center cursor-default my-0">Log in</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">Email</label>
                    <input
                      id="email"
                      className="border p-3 dark:bg-indigo-500 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
                    <input
                      id="password"
                      className="border p-3 shadow-md dark:bg-indigo-500 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out cursor-pointer"
                    onClick={handleForgotPasswordClick}
                  >
                    <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Forget your password?
                    </span>
                  </a>
                  <button
                    className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-3 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                    type="submit"
                  >
                    LOG IN
                  </button>
                </form>
                <div className="flex flex-col items-center justify-center text-sm mt-4">
                  <h3 className="dark:text-gray-300">Don't have an account?</h3>
                  <button onClick={handleSignUpClick} className="text-blue-400 ml-2 underline">Sign Up As User</button>
                  <button onClick={handleSignUpClickServiceProvider} className="text-blue-400 ml-2 underline">Sign Up As Service Provider</button>
                </div>
              </>
            )}
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

export default Login;