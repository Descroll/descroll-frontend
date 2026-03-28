import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import "../../App.css";
import StateBox from "../../components/StateBox";

function Signup() {

    const navigate = useNavigate();

    const [formData,setFormData] = useState({username: "", email: "", password: "", agreedToTerms: false,});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const{name, value, type, checked} = e.target;

        setError(false);

        setFormData((prev) => ({...prev, [name]:type === "checkbox" ? checked : value,}));
    };

    const handleSubmit = (e) => {e.preventDefault();

        // reset states before each new submit
        setError(false);
        setSuccess(false);
        setLoading(true);


        //for testing
        setTimeout(() => {

            // this is to test what happens if signup fails
            if (formData.email === "taken@email.com") {
                setError(true);
                setLoading(false);
                return;
            }

            // later this will happen after backend confirms account creation
            setSuccess(true);
            setLoading(false);

            console.log("signup was successful", formData);

            setTimeout(() =>{navigate("/login");}, 1000);

        }, 800);
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Get Started Now</h2>

                {loading && <StateBox title="creating account..." />}
                {error && <StateBox title="signup failed" subtitle="that email may already be in use" />}
                {!loading && success && <StateBox title="signup successful" subtitle="redirecting to login..." />}

                {!success && (

                    <form className="auth-form" onSubmit={handleSubmit}>

                        <input id="signup-username" name="username" className="auth-input" type = "text" placeholder = "Username" value={formData.username} onChange={handleChange} />
                        <input id="signup-email" name="email" className="auth-input" type = "email" placeholder = "Email" value={formData.email} onChange={handleChange} />
                        <input id="signup-password" name="password" className="auth-input" type = "password" placeholder = "Password" value={formData.password} onChange={handleChange}/>

                        <label className="terms" htmlFor="signup-terms">
                            <input id="signup-terms" name="agreedToTerms" type = "checkbox" checked={formData.agreedToTerms} onChange={handleChange} />
                            I agree to the terms & policy
                        </label>

                        <button className="primary-btn" type="submit" disabled={loading}> {loading ? "signing up..." : "Signup"} </button>

                    </form>    
                )}
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