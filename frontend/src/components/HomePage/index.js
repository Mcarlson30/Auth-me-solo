// frontend/src/components/LoginFormPage/index.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPhotos } from "../../store/photo";
import { useHistory, useParams } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photo)
    // console.log(photos)
    // console.log(sessionUser)
    // const photos = useSelector(state => state.photos)
    // const [photos, setPhotos] = useState('')
    // const photoArray = Object.values(photos)

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    console.log(sessionUser)
    console.log('photos', photos)


    const signUp = () => {
        history.push('/signup')
    }

    function userPhotos(photo) {
        return function () {
            history.push(`/${photo.User.id}`)
        };
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

    return (
        <>
            <div className='photos-container'>
                <div className='select-photos'>
                    {photos.map(photo => (
                        < div className='photo-div' >
                            <div
                                className='photo-image'
                                style={{ backgroundImage: `url('${photo.photoUrl}')` }}
                                onClick={singlePhoto(photo)}
                            ></div>
                            <div className='photo-info'>
                                <div className='photo-user-name' onClick={userPhotos(photo)}>{photo.name} by {photo.User.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}
export default HomePage;