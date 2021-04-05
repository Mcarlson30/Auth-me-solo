// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='signup-div'>
            <form onSubmit={handleSubmit}>
                <div className='sign-up-title'>Sign Up</div>
                <div className='errors'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <input
                    type="text"
                    value={email}
                    className='signup-input'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={username}
                    placeholder='Username'
                    className='signup-input'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder='Password'
                    className='signup-input'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    placeholder='Confirm password'
                    className='signup-input'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className='submit-signup'>
                    <button type="submit" className='signup-form-button'>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignupFormPage;