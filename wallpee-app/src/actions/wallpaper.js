import apolloClient from '../graphql/client';
import { GET_WALLPAPERS, GET_WALLPAPER_DETAILS } from '../graphql/queries';
import { WALLPAPER_DOWNLOAD, WALLPAPER_LIKE_DISLIKE } from '../graphql/mutations';

export const wallpaperLoading = data => ({
    type: 'WALLPAPER_LOADING',
    data: data,
});

export const wallpaperError = error => ({
    type: 'WALLPAPER_ERROR',
    error,
});

export const getWallpaper = (data) => ({
    type: 'GET_WALLPAPERS',
    data
});

export const clearWallpapers = () => {
    return {
        type: 'CLEAR_WALLPAPERS'
    };
};

export const getWallpapers = (data, type) => dispatch => {
    dispatch(wallpaperLoading({ isLoading: true, type }));
    return apolloClient.query({
        query: GET_WALLPAPERS,
        variables: {
            ...data
        },
        fetchPolicy: 'no-cache'
    })
    .then((result) => {
        if (result && result.data && result.data.getWallpapers && result.data.getWallpapers.wallpapers) dispatch(getWallpaper({ data: result.data.getWallpapers, ...data, type }));
        dispatch(wallpaperLoading({ isLoading: false, type }));
    })
    .catch((err) => {
        dispatch(wallpaperLoading({ isLoading: false, type }));
        dispatch(wallpaperError(err.message || 'ERROR'));
    })
}

export const getWallpaperDetails = (data) => dispatch => {
    return apolloClient.query({
        query: GET_WALLPAPER_DETAILS,
        variables: {
            ...data
        },
        fetchPolicy: 'no-cache'
    })
    .then((result) => {
        if (result && result.data && result.data.getWallpaperDetails) return result.data.getWallpaperDetails
        return 
    })
    .catch((err) => {
        return
    })
}

export const onWallpaperDownload = (data) => dispatch => {
    return apolloClient.mutate({
        mutation: WALLPAPER_DOWNLOAD,
        variables: {
            ...data
        }
    })
    .then(async (result) => {
        return result
    })
    .catch((err) => {
        console.log(err?.message || 'ERROR');
        return
    })
}

export const wallpaperLikeDislike = (data) => dispatch => {
    return apolloClient.mutate({
        mutation: WALLPAPER_LIKE_DISLIKE,
        variables: {
            ...data
        }
    })
    .then(async (result) => {
        return result
    })
    .catch((err) => {
        console.log(err?.message || 'ERROR');
        return
    })
}