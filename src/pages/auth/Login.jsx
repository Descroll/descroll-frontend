import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import "../../App.css";
import StateBox from "../../components/StateBox";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({email: "", password: "",});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const{name, value} = e.target;

        setError(false);

        setFormData((prev) => ({...prev, [name]:value ,}));
    };

    const handleSubmit = (e) => {e.preventDefault();

        // reset states before each new submit
        setError(false);
        setSuccess(false);
        setLoading(true);


        //for testing
        setTimeout(() => {

            // this is to test what happens if login fails
            if (formData.email !== "taken@email.com" || formData.password !== "123456") {
                setError(true);
                setLoading(false);
                return;
            }

            // later this will happen after backend confirms login
            setSuccess(true);
            setLoading(false);

            console.log("login was successful", formData);

            setTimeout(() =>{navigate("/profile");}, 1000);

        }, 800);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Welcome Back!</h2>

                <p className="auth-subtitle">
                    Enter your credentials to access your account
                </p>

                {loading && <StateBox title="loggin in..." />}
                {error && <StateBox title="login failed" subtitle="invalid email or passwordd" />}
                {!loading && success && <StateBox title="login successful" subtitle="redirecting..." />}

                {!success && (

                    <form className="auth-form" onSubmit={handleSubmit}>

                        <input id="login-email" name="email" className="auth-input" type = "email" placeholder = "Email" value={formData.email} onChange={handleChange} />
                        <input id="login-password" name="password" className="auth-input" type = "password" placeholder = "Password" value={formData.password} onChange={handleChange} />

                        <div className="forgot-row">
                            <span className="forgot-link">Forgot password?</span>
                        </div>

                        <button className="primary-btn" type="submit" disabled={loading}> {loading ? "logging up..." : "Login"} </button>

                    </form>    
                )}
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