// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPhotos, deleteUserPhoto } from "../../store/photo";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import './UserPhoto.css';

function UserPhotos() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photo)
    // console.log(photos)
    console.log(sessionUser.id)

    const photoArray = Object.values(photos)

    const deletePhoto = (e) => {
        // e.preventDefault();
        // console.log("photo Id", e.target.id);
        dispatch(deleteUserPhoto(sessionUser.id, e.target.id))
    };


    useEffect(() => {
        dispatch(getUserPhotos(sessionUser.id))
    }, [sessionUser, dispatch, photoArray.length])


    // console.log(sessionUser)
    // console.log('photos', photos)


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
                    <div className='add-photo-container'>
                        <button>Add</button>
                    </div>
                    {photos.map(photo => (
                        < div className='photo-div' >
                            { console.log("photo", photo)}
                            <div className='photo-image' style={{ backgroundImage: `url('${photo.photoUrl}')` }}></div>
                            <div className='photo-info'>
                                <div className='photo-user-name'>{photo.name} by {sessionUser.username}</div>
                                <div className='delete-button'>
                                    <button className='delete' onClick={deletePhoto} id={photo.id}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}
export default UserPhotos;