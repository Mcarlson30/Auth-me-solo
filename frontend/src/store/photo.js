import { csrfFetch } from './csrf';

const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
const GET_PHOTOS = 'GET_PHOTOS'
const DELETE_PHOTO = 'DELETE_PHOTO'
const GET_SINGLE_PHOTO = 'GET_SINGLE_PHOTO'
const ADD_COMMENT = 'ADD_COMMENT'

const setPhoto = (photo) => ({
    type: UPLOAD_PHOTO,
    payload: photo
});

const setComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
});

const deletePhoto = (photo) => ({
    type: DELETE_PHOTO,
    payload: photo
});

const getPhotos = (photos) => ({
    type: GET_PHOTOS,
    payload: photos
});

const getPhoto = (photo) => ({
    type: GET_SINGLE_PHOTO,
    payload: photo
});

export const createPhoto = (userId, image, name) => async (dispatch) => {
    console.log('image', image)
    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("image", image)
    formData.append("name", name)

    const res = await csrfFetch("/api/photo", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    })
    const data = await res.json();
    console.log('data----', data.photos)
    dispatch(setPhoto(data.photos))
};

export const createComment = (userId, photoId, text) => async (dispatch) => {
    const res = await csrfFetch("/api/photo/comment", {
        method: "POST",
        body: JSON.stringify({ userId, photoId, text })
    })
    const data = await res.json();
    console.log('data-----', data)
    dispatch(setComment(data))
};

export const deleteUserPhoto = (userId, photoId) => async (dispatch) => {
    const res = await csrfFetch(`/api/photo/delete/${userId}/${photoId}`, {
        method: "DELETE",
    })
    const data = await res.json();
    dispatch(deletePhoto(data.photos))
}

export const getSinglePhoto = (photoId) => async (dispatch) => {
    const res = await csrfFetch(`/api/photo/photo/${photoId}`)
    const data = await res.json();
    console.log('data', data)
    dispatch(getPhoto(data))
}

export const getUserPhotos = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/photo/${userId}`)
    const data = await res.json();
    console.log(data)
    dispatch(getPhotos(data))
}


export const getAllPhotos = () => async (dispatch) => {
    const res = await csrfFetch(`/api/photo`)
    const data = await res.json();
    dispatch(getPhotos(data))
}

export default function photoReducer(state = [], action) {
    let newState;
    switch (action.type) {
        case UPLOAD_PHOTO:
            return [...action.payload]
        case GET_PHOTOS: {
            return [...action.payload]
        }
        case DELETE_PHOTO: {
            newState = [...action.payload];
            return newState;
        }
        case GET_SINGLE_PHOTO: {
            return [action.payload]
        }
        case ADD_COMMENT: {
            return [...state, action.payload]
        }
        default:
            return state
    }
}