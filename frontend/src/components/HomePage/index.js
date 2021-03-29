// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return (
        <div>
            <div className='title'>Find your inspiration</div>
            <div className='quote'>Join the Shimmer community, home to many
            incredible photos and groups</div>
            <div className='start-signup'>
                <button className='sign-up' onclick={<Redirect to='/signup' />} ></button>
            </div>
        </div>
    )


}
export default HomePage;