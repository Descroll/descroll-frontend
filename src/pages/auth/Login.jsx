function Login() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">DeScroll </h1>
                <h2 className="auth-title">Welcome Back!!</h2>

                <p className="auth-subtitle">
                    Enter your credentials to access your account
                </p>

                <div className="auth-form">

                    <input className="auth-input" type = "email" placeholder = "Email" />
                    <input className="auth-input" type = "password" placeholder = "Password" />

                    <div className="forgot-row">
                        <span className="forgot-link">Forgot password?</span>
                    </div>

                    <button className="primary-btn"> Login </button>

                </div>    

                <p className="auth-footer">
                    Don't have an account yet? {" "}
                    <span className="link-text">Sign up</span>
                </p>
            </div>

        </div>

    );
}
export default Login; 