function Signup() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Get Started Now</h2>

                <div className="auth-form">

                    <input className="auth-input" type = "text" placeholder = "Username" />
                    <input className="auth-input" type = "text" placeholder = "Email" />
                    <input className="auth-input" type = "text" placeholder = "Password" />

                    <label className="terms">
                        <input type = "checkbox" />
                        I agree to the terms & policy
                    </label>

                    <button className="primary-btn"> Signup </button>

                </div>    

                <p className="auth-footer">
                    Have an account already? {" "}
                    <span className="link-text">Log in</span>
                </p>
            </div>

        </div>

    );
}
export default Signup; 