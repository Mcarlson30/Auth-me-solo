// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePhoto, createComment } from "../../store/photo";
import { useHistory } from 'react-router-dom';
import './SinglePhoto.css';

function SinglePhoto() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [text, setText] = useState('')

    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photo)

    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);

    const commentsArray = Object.values(photos[0].Comments)


    useEffect(() => {
        dispatch(getSinglePhoto(id))
    }, [id, dispatch, photos[1]])

    function userPhotos(photo) {
        return function () {
            history.push(`/${photo.User.id}`)
        };
    }
    const userId = sessionUser.id

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('inside handle submit comment', text)
        console.log('helpme---', photos[0].Comments)
        dispatch(createComment(userId, id, text));
        setText('')
    };

    console.log('photo', photos[0].Comments)
    return (
        <>
            <div className='single-photo-page'>
                <div className='single-photo-div'>
                    <div className='image-container'>
                        <img src={`${photos[0].photoUrl}`} alt='text' className='photo-img'></img>
                    </div>
                    <div className='single-photo-info'
                        onClick={userPhotos(photos[0])}>{photos[0].name} by {photos[0].User.username}</div>
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
                    <div className='comment-form-div'>
                        <form className='comment-form' onSubmit={handleSubmit}>
                            <div>Post a Comment</div>
                            <input type='textarea'
                                value={text}
                                className='comment-text'
                                placeholder='Enter a new comment'
                                onChange={(e) => setText(e.target.value)}></input>
                            <button className='submit-comment' type='submit'>Add Comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )


}
export default SinglePhoto;