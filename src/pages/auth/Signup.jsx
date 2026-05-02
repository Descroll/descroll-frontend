import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import BASE_URL from "../../api";

function Signup() {
    const [formData,setFormData] = useState({username: "", email: "", password: "", agreedToTerms: false,});
    const [status, setStatus] = useState({ error: null, success: null, loading: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const{name, value, type, checked} = e.target;
        setFormData((prev) => ({...prev, [name]:type === "checkbox" ? checked : value,}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        if (!formData.agreedToTerms) {
            setStatus({ error: "Please agree to the terms & policy.", success: null, loading: false });
            return;
        }

        setStatus({ error: null, success: null, loading: true });

        try {
            const response = await apiFetch(`/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    display_name: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `HTTP error: Status ${response.status}`);
            }

            console.log("signup was successful", result);
            setStatus({ error: null, success: "Signup successful! You can now log in.", loading: false });
            navigate('/login')
        } catch (err) {
            setStatus({ error: err.message, success: null, loading: false });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Get Started Now</h2>

                <form className="auth-form" onSubmit={handleSubmit}>

                    {status.error && <div style={{ color: "red", marginBottom: "10px" }}>{status.error}</div>}
                    {status.success && <div style={{ color: "green", marginBottom: "10px" }}>{status.success}</div>}

                    <input id="signup-username" name="username" className="auth-input" type = "text" placeholder = "Username" value={formData.username} onChange={handleChange} />
                    <input id="signup-email" name="email" className="auth-input" type = "email" placeholder = "Email" value={formData.email} onChange={handleChange} />
                    <input id="signup-password" name="password" className="auth-input" type = "password" placeholder = "Password" value={formData.password} onChange={handleChange}/>

                    <label className="terms" htmlFor="signup-terms">
                        <input id="signup-terms" name="agreedToTerms" type = "checkbox" checked={formData.agreedToTerms} onChange={handleChange} />
                        I agree to the terms & policy
                    </label>

                    <button className="primary-btn" type="submit" disabled={status.loading}> 
                        {status.loading ? "Loading..." : "Signup"} 
                    </button>

                </form>    

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