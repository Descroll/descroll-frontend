import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";

function Login() {

    const [formData, setFormData] = useState({email: "", password: "",});

    const handleChange = (e) => {
        const{name, value} = e.target;

        setFormData((prev) => ({...prev, [name]:value ,}));
    };

    const handleSubmit = (e) =>{e.preventDefault(); console.log("login was successful", formData);};

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Welcome Back!</h2>

                <p className="auth-subtitle">
                    Enter your credentials to access your account
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <input id="login-email" name="email" className="auth-input" type = "email" placeholder = "Email" value={formData.email} onChange={handleChange} />
                    <input id="login-password" name="password" className="auth-input" type = "password" placeholder = "Password" value={formData.password} onChange={handleChange} />

                    <div className="forgot-row">
                        <span className="forgot-link">Forgot password?</span>
                    </div>

                    <button className="primary-btn" type="submit"> Login </button>

                </form>    

                <p className="auth-footer">
                    Don't have an account yet? {" "}
                    <Link to="/signup" className="link-text">
                    Sign up
                    </Link>
                </p>
            </div>

        </div>

    );
}
export default Login; 