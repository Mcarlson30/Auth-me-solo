// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div className='session-buttons'>
                    <div className='login-button'>
                        <NavLink to="/login" className='login-text'>Log In</NavLink>
                    </div>
                    <div className='signup-button'>
                        <NavLink to="/signup" className='signup-text'>Sign Up</NavLink>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className='navbar'>
            <div className='nav-logo-container'>
                <div className='home-logo'>
                    <div className='logo'>
                        <img src='/images/logo.png' alt='me' className='logo-image'></img>
                    </div>
                    <NavLink exact to="/" className='home-link'>Shimmer</NavLink>
                </div>
            </div>
            <div className='search-bar'>

            </div>
            <div className='session-links'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;