import { useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import "../componets/Login.css";

import "../../src/App";
import { UserContext } from "../App";

export default function SignInPage() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form action="/home">
        <p>
          <label>Username or Email Address</label>
          <br />
          <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password">
            <label className="right-label">Forget password?</label>
          </Link>
          <br />
          <input type="password" name="password" required />
        </p>
        <p>
          <button
            id="sub_btn"
            type="submit"
            onClick={() => {
              setIsAuthenticated(true);
              navigate("/", {replace: true});
            }}
          >
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an Account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
