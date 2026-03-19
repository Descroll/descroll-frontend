import { Link } from "react-router-dom";
import "../../styles/auth.css";
function Signup() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Get Started Now</h2>

                <div className="auth-form">

                    <input className="auth-input" type = "text" placeholder = "Username" />
                    <input className="auth-input" type = "email" placeholder = "Email" />
                    <input className="auth-input" type = "password" placeholder = "Password" />

                    <label className="terms">
                        <input type = "checkbox" />
                        I agree to the terms & policy
                    </label>

                    <button className="primary-btn"> Signup </button>

                </div>    

                <p className="auth-footer">
                    Have an account already? {" "}
                    <Link to="/login" className="link-text">
                    Log in
                    </Link>
                </p>
            </div>

        </div>

    );
}
export default Signup; 