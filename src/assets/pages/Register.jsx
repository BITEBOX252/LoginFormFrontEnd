import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import {  Link } from 'react-router-dom';

const Register = () => {
 
 

  return (
    <main className="mb-24 mt-12">
      <div className="container mx-auto">
        <section>
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl text-center font-semibold">Register Account</h3>
                <br />
                <form >
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
                      
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-4">
                    <FormControlLabel
                      control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
                      label="I agree to terms and conditions."
                    />
                    
                  </div>

                  {/* Submit Button */}
                  
                    <button
                      className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-center items-center"
                      type="submit"
                    >
                      <span className="mr-2">Sign Up</span>
                      <i className="fas fa-user-plus" />
                    </button>
                

                  {/* Existing Account Link */}
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{' '}
                      <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                      </Link>
                    </p>
                  </div>

                  
                  
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


