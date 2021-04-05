// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePhoto } from "../../store/photo";
import { useHistory } from 'react-router-dom';
import './SinglePhoto.css';

function SinglePhoto() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photo)

    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id)

    useEffect(() => {
        dispatch(getSinglePhoto(id))
    }, [id, dispatch])

    console.log('photo', photos[0].Comments)
    return (
        <>
            {/* <div className='photos-container'>
                <div className='select-photos'>
                    {photos.map(photo => (
                        < div className='photo-div' >
                            <div
                                className='photo-image'
                                style={{ backgroundImage: `url('${photo.photoUrl}')` }}
                            ></div>
                            <div className='photo-info'>
                                <div className='photo-user-name'>{photo.name} by {photo.User.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className='single-photo-page'>
                <div className='single-photo-div'>
                    <div className='image-container'>
                        <img src={`${photos[0].photoUrl}`} alt='text' className='photo-img'></img>
                    </div>
                    <div className='single-photo-info'>{photos[0].name} by {photos[0].User.username}</div>
                    <div className='comments-tite'>Comments</div>
                    <div className='outter-comments-div'>
                        <div className='comment-container'>
                            {photos[0].Comments && photos[0].Comments.map(comment => (
                                <div className='poster-info'>
                                    <div className='comment-body'>{comment.text}</div>
                                    <div className='poster'>posted by {photos[0].User.username}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}
export default SinglePhoto;