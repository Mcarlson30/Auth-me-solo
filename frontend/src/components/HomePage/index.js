// frontend/src/components/LoginFormPage/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    // const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    console.log(sessionUser)
    const history = useHistory()

    const signUp = () => {
        history.push('/signup')
    }

    if (!sessionUser) return (
        <div className='home-page-text'>
            <div className='title'>Find your inspiration</div>
            <div className='quote'>Join the Shimmer community today</div>
            <div className='start-signup'>
                <button className='sign-up' onClick={signUp}>Start for free</button>
            </div>
        </div>
    )

    return (
        <>
        </>
    )


}
export default HomePage;