import apolloClient from '../graphql/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import { ADD_USER, ADD_WALLPAPER_TO_FAVOURITES } from '../graphql/mutations';
import { setData } from '../utils/storage';

export const userLoading = isLoading => ({
    type: 'USER_LOADING',
    isLoading
});

export const userError = error => ({
    type: 'USER_ERROR',
    error,
});

export const setUser = (data) => ({
    type: 'SET_USER',
    data
});

export const setToken = (token) => ({
    type: 'SET_TOKEN',
    token
});

export const setFavourites = (wallpaperId) => ({
    type: 'SET_FAVOURITES',
    wallpaperId
})

export const getUserDetails = (token) => dispatch => {
    return apolloClient.query({
        query: GET_USER_DETAILS,
        fetchPolicy: 'no-cache'
    })
    .then((result) => {
        if (result && result.data && result.data.getUserDetails) dispatch(setUser({ ...result.data.getUserDetails, token }));
        dispatch(userLoading(false));
    })
    .catch((err) => {
        dispatch(userLoading(false));
        dispatch(userError(err?.message || 'ERROR'));
    })
}

export const addUser = () => dispatch => {
    dispatch(userLoading(true));
    return apolloClient.mutate({
        mutation: ADD_USER
    })
    .then(async (result) => {
        if (result && result.data && result.data.addUser) {
            if(result.data.addUser.token) setData('token', result.data.addUser.token)
            dispatch(setUser({ ...result.data.addUser }));
            dispatch(userLoading(false));
        } else dispatch(userLoading(false));
    })
    .catch((err) => {
        dispatch(userLoading(false));
        dispatch(userError(err?.message || 'ERROR'));
    })
}

export const addWallpaperToFavourites = (data) => dispatch => {
    return apolloClient.mutate({
        mutation: ADD_WALLPAPER_TO_FAVOURITES,
        variables: {
            ...data
        }
    })
    .then(async (result) => {
        if (result && result.data && result.data.addWallpaperToFavourites) dispatch(setFavourites(data?.wallpaperId))
    })
    .catch((err) => {
        return
    })
}
