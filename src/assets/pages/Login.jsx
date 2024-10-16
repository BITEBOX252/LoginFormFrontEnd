// "use client";

// import { useState } from "react";
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Frontend-only and no actual login functionality
//     console.log("Logging in with:", { email, password });
//   };

//   return (
//     <div>
//       <div className="screenMiddleDiv">
//         <div className="formDiv">
//           <form onSubmit={handleSubmit}>
//             <h2 className="text-center">Login</h2>

//             <div>
//               <label htmlFor="email" className="formLabel">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="my-6">
//               <label htmlFor="password" className="formLabel">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit" className="formButton">
//               Login
//             </button>

//             <div className="text-center mt-4">
//               <a href="#" className="text-sm hover:underline">
//                 Forgot your password?
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { TextField, Button, Alert, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/authSlice';

const Login = () => {
  const [serverError, setServerError] = useState({});
  const [formError, setFormError] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    let isMounted = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (isMounted) {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError({ email: '', password: '' });
    setServerError({});

    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    if (!actualData.email) {
      setFormError((prev) => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!actualData.password) {
      setFormError((prev) => ({ ...prev, password: 'Password is required' }));
      return;
    }

    const res = await loginUser(actualData);
    if (res.error) {
      setServerError(res.error.data.errors || {});
    }
    if (res.data) {
      storeToken(res.data.token);
      const { access_token } = getToken();
      dispatch(setUserToken({ access_token }));
      navigate('/dashboard');
    }
  };

  const { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token }));
  }, [dispatch, access_token]);

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Typography variant="h5" component="h3" className="text-center mb-6">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <TextField
              fullWidth
              margin="normal"
              required
              id="email"
              name="email"
              label="Email Address"
              error={!!formError.email}
              helperText={formError.email}
              className="bg-gray-50"
            />
            {serverError.email && (
              <Typography className="text-red-500 text-xs mt-1 pl-2">
                {serverError.email[0]}
              </Typography>
            )}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <TextField
              fullWidth
              margin="normal"
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              error={!!formError.password}
              helperText={formError.password}
              className="bg-gray-50"
            />
            {serverError.password && (
              <Typography className="text-red-500 text-xs mt-1 pl-2">
                {serverError.password[0]}
              </Typography>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center mt-4"
          >
            <span className="mr-2">Sign In</span>
            <i className="fas fa-sign-in-alt" />
          </button>

          <div className="text-center mt-4">
            <p>
              Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
            </p>
            <p className="mt-0">
              <Link to="/forgot-password/" className="text-red-500">Forgot Password?</Link>
            </p>
          </div>
        </form>

        {serverError.non_field_errors && (
          <Alert severity="error" className="mt-4">
            {serverError.non_field_errors[0]}
          </Alert>
        )}
      </main>
    </section>
  );
};

export default Login;
