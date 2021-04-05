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
    const [formVisibility, setFormVisibility] = useState('hidden')
    const [addVisibility, setAddVisibility] = useState('visible')
    // const [photos, setPhotos] = useState([])

    const url = window.location.pathname;
    const id = url[1];



    const photos = useSelector(state => state.photo)
    const sessionUser = useSelector(state => state.session.user)

    const deletePhoto = (e) => {
        dispatch(deleteUserPhoto(sessionUser.id, e.target.id))
    };


    useEffect(() => {
        dispatch(getUserPhotos(id))
    }, [id, dispatch])

    const handleSubmit = (e) => {
        const userId = id
        e.preventDefault();
        dispatch(createPhoto(userId, image, name))

    };


    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const signUp = () => {
        history.push('/signup')
    }

    const showForm = () => {
        setFormVisibility('visible')
        // setAddVisibility('hidden')
    }

    const showAddButton = () => {
        setFormVisibility('hidden')
        // setAddVisibility('visible')
    }

    function singlePhoto(photo) {
        return function () {
            history.push(`/photo/${photo.id}`)
        };
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

    let currentUser = sessionUser.id == id
    return (
        <>
            <div className='photos-container'>
                <div className='select-photos'>
                    {currentUser &&
                        < div className='form-div'>
                            <button onClick={showForm} style={{ visibility: addVisibility }} className='add-photo-button'>Add</button>
                            <form onSubmit={handleSubmit} className='add-photo-form' style={{ visibility: formVisibility }}>
                                <div className='add-photo-container'>
                                    <input
                                        type='text'
                                        className='input-name'
                                        placeholder='Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input type="file" onChange={updateFile} className='input-file' />
                                    <button type="submit" onClick={showAddButton}
                                        className='submit-photo'>Add Photo</button>
                                </div>
                            </form>
                        </div>
                    }
                    {photos.map(photo => (
                        < div className='photo-div' >
                            <div className='photo-image' style={{ backgroundImage: `url('${photo.photoUrl}')` }}
                                onClick={singlePhoto(photo)}></div>
                            <div className='photo-info'>
                                <div className='photo-user-name'>{photo.name} by
                                {photo.User.username}</div>
                                {currentUser &&
                                    <div className='delete-button'>
                                        <button className='delete' onClick={deletePhoto} id={photo.id}>Remove</button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}
export default UserPhotos;