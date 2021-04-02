// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPhotos, deleteUserPhoto, createPhoto } from "../../store/photo";
import { useHistory } from 'react-router-dom';
import './UserPhoto.css';

function UserPhotos() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');

    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photo)
    // let userId;
    // if (sessionUser) (
    //     userId = sessionUser.id
    // )


    const photoArray = Object.values(photos)

    const deletePhoto = (e) => {
        dispatch(deleteUserPhoto(sessionUser.id, e.target.id))
    };


    useEffect(() => {
        dispatch(getUserPhotos(sessionUser.id))
    }, [sessionUser, dispatch, photoArray.length])

    const handleSubmit = (e) => {
        const userId = sessionUser.id
        console.log('file-------', image)
        e.preventDefault();
        dispatch(createPhoto(userId, image, name))

    };


    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };
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
                    <button>Add</button>
                    <form onSubmit={handleSubmit}>
                        <div className='add-photo-container'>
                            <input
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input type="file" onChange={updateFile} />
                            <button type="submit">Add Photo</button>
                        </div>
                    </form>
                    {photos.map(photo => (
                        < div className='photo-div' >
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