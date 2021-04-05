// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button onClick={openMenu} className='profile-button'>
                <i className="fas fa-user-circle"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <NavLink to={`/${sessionUser.id}`} className='user-photo-link'>Photos</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/albums/${sessionUser.id}`} className='user-photo-link'>Albums</NavLink>
                    </li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;