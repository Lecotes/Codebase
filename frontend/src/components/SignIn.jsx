import { useState } from "react";
import "../styles/Auth.scss"; // Using the same CSS file

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        setTimeout(() => {
            console.log("Signin successful:", formData);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="auth-container">
            <h2>Sign in to your account</h2>
            <p>Enter your email and password to sign in</p>
            {error && <p className="auth-error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="auth-form__input"
                    />
                    <small className="auth-form__small">
                        This is your email.
                    </small>
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="auth-form__input"
                    />
                    <small className="auth-form__small">
                        This is your password.
                    </small>
                </label>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="auth-form__button"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default SignIn;
