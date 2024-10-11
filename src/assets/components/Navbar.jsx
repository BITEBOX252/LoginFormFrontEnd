import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/Register">Register</Link>
      <Link to="/dashboard">Login</Link>
    </nav>
  );
}

export default Navbar;
