// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPhotos } from "../../store/photo";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    // console.log(photos)
    // console.log(sessionUser)
    // const photos = useSelector(state => state.photos)
    // const [photos, setPhotos] = useState('')

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    // const photos = useSelector(state => {
    //     return state.photo.map(photoId => state.photo[photoId])
    // })
    const photos = useSelector(state => state.photo)
    console.log(sessionUser)
    console.log('photos', photos)


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
            <div className='photos-container'>
                <div className='select-photos'>
                    {photos.map(photo => (
                        < div className='photo-div' >
                            <div className='photo-image' style={{ backgroundImage: `url('${photo.photoUrl}')` }}></div>
                            <div className='photo-info'>
                                <div className='photo-user-name'>{photo.name} by {sessionUser.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}
export default HomePage;