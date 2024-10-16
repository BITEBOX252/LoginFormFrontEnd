import { TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Login = () => {
  
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Typography variant="h5" component="h3" className="text-center mb-6">
          Login
        </Typography>
        <form >
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
              
              className="bg-gray-50"
            />
            
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
             
              className="bg-gray-50"
            />
           
          </div>

          <button
            type="submit"
          
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

        
      </main>
    </section>
  );
};

export default Login;
