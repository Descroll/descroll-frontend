import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
function Signup() {

    const [formData,setFormData] = useState({username: "", email: "", password: "", agreedToTerms: false,});

    const handleChange = (e) => {
        const{name, value, type, checked} = e.target;

        setFormData((prev) => ({...prev, [name]:type === "checkbox" ? checked : value,}));
    };

    const handleSubmit = (e) =>{e.preventDefault(); console.log("signup was successful", formData);};


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Get Started Now</h2>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <input id="signup-username" name="username" className="auth-input" type = "text" placeholder = "Username" value={formData.username} onChange={handleChange} />
                    <input id="signup-email" name="email" className="auth-input" type = "email" placeholder = "Email" value={formData.email} onChange={handleChange} />
                    <input id="signup-password" name="password" className="auth-input" type = "password" placeholder = "Password" value={formData.password} onChange={handleChange}/>

                    <label className="terms" htmlFor="signup-terms">
                        <input id="signup-terms" name="agreedToTerms" type = "checkbox" checked={formData.agreedToTerms} onChange={handleChange} />
                        I agree to the terms & policy
                    </label>

                    <button className="primary-btn" type="submit"> Signup </button>

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