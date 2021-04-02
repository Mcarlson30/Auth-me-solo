import { csrfFetch } from './csrf';

const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
const GET_PHOTOS = 'GET_PHOTOS'
const DELETE_PHOTO = 'DELETE_PHOTO'

const setPhoto = (photo) => ({
    type: UPLOAD_PHOTO,
    payload: photo
});

const deletePhoto = (photo) => ({
    type: DELETE_PHOTO,
    payload: photo
});

const getPhotos = (photos) => ({
    type: GET_PHOTOS,
    payload: photos
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
    dispatch(setPhoto(data))
};

export const deleteUserPhoto = (userId, photoId) => async (dispatch) => {
    console.log("deletePhoto thunk", 'userId', userId, 'photo Id', photoId)
    const res = await csrfFetch(`/api/photo/delete/${userId}/${photoId}`, {
        method: "DELETE",
    })
    const data = await res.json();
    console.log("deleted item", data.photos)
    dispatch(deletePhoto(data.photos))
}


export const getUserPhotos = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/photo/${userId}`)
    const data = await res.json();
    dispatch(getPhotos(data))
}

export const getSinglePhoto = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/photo/${userId}`)
    const data = await res.json();
    dispatch(getPhotos(data))
}

export const getAllPhotos = () => async (dispatch) => {
    const res = await csrfFetch(`/api/photo`)
    const data = await res.json();
    // console.log('all photo thunk')
    dispatch(getPhotos(data))
}

export default function photoReducer(state = [], action) {
    let newState;
    switch (action.type) {
        case UPLOAD_PHOTO:
            return [...state, action.payload]
        case GET_PHOTOS: {
            return [...action.payload]
        }
        case DELETE_PHOTO: {
            newState = [...action.payload];
            return newState;
        }
        default:
            return state
    }
}