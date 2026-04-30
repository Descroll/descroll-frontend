import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";
import "../../styles/auth.css";
import BASE_URL from "../../api";

function Login() {
    const [formData, setFormData] = useState({email: "", password: "",});
    const [status, setStatus] = useState({ error: null, success: null, loading: false });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData((prev) => ({...prev, [name]:value ,}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setStatus({ error: null, success: null, loading: true });

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `HTTP error: Status ${response.status}`);
            }

            login(result.user);

            console.log("login was successful", result);
            setStatus({ error: null, success: "Login successful!", loading: false });
            navigate("/home")
        } catch (err) {
            setStatus({ error: err.message, success: null, loading: false });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Welcome Back!</h2>

                <p className="auth-subtitle">
                    Enter your credentials to access your account
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    
                    {status.error && <div style={{ color: "red", marginBottom: "10px" }}>{status.error}</div>}
                    {status.success && <div style={{ color: "green", marginBottom: "10px" }}>{status.success}</div>}

                    <input id="login-email" name="email" className="auth-input" type = "email" placeholder = "Email" value={formData.email} onChange={handleChange} />
                    <input id="login-password" name="password" className="auth-input" type = "password" placeholder = "Password" value={formData.password} onChange={handleChange} />

                    <div className="forgot-row">
                        <span className="forgot-link">Forgot password?</span>
                    </div>

                    <button className="primary-btn" type="submit" disabled={status.loading}> 
                        {status.loading ? "Loading..." : "Login"} 
                    </button>

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