import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';

const Register = () => {
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc'),
    };
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        actualData.latitude = latitude;
        actualData.longitude = longitude;
        
        const res = await registerUser(actualData);
        console.log(res);

        if (res.error) {
          setServerError(res.error.data.errors);
        }

        if (res.data) {
          storeToken(res.data.token);
          navigate('/dashboard');
        }
      },
      (error) => {
        console.error('Error retrieving location:', error);
        setServerError({ location: ['Unable to retrieve your location. Please try again.'] });
      }
    );
  };

  return (
    <main className="mb-24 mt-12">
      <div className="container mx-auto">
        <section>
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl text-center font-semibold">Register Account</h3>
                <br />
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                    <TextField
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      error={!!serverError.name}
                      helperText={serverError.name ? serverError.name[0] : ""}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <TextField
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      error={!!serverError.email}
                      helperText={serverError.email ? serverError.email[0] : ""}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <TextField
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      error={!!serverError.password}
                      helperText={serverError.password ? serverError.password[0] : ""}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">Confirm Password</label>
                    <TextField
                      type="password"
                      id="password2"
                      name="password2"
                      placeholder="Confirm Password"
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      error={!!serverError.password2}
                      helperText={serverError.password2 ? serverError.password2[0] : ""}
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-4">
                    <FormControlLabel
                      control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
                      label="I agree to terms and conditions."
                    />
                    {serverError.tc && (
                      <Typography className="text-red-600 text-sm">{serverError.tc[0]}</Typography>
                    )}
                  </div>

                  {/* Submit Button */}
                  {isLoading ? (
                    <button
                      disabled
                      className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-center items-center"
                    >
                      <span className="mr-2">Processing</span>
                      <i className="fas fa-spinner fa-spin" />
                    </button>
                  ) : (
                    <button
                      className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-center items-center"
                      type="submit"
                    >
                      <span className="mr-2">Sign Up</span>
                      <i className="fas fa-user-plus" />
                    </button>
                  )}

                  {/* Existing Account Link */}
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{' '}
                      <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                      </Link>
                    </p>
                  </div>

                  {/* Error Alerts */}
                  {serverError.non_field_errors && (
                    <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
                  )}
                  {serverError.location && (
                    <Alert severity="error">{serverError.location[0]}</Alert>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
