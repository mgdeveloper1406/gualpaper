import gql from "graphql-tag";

/* add user */
export const ADD_USER = gql`
  mutation addUser {
    addUser {
        _id
        token
        createdAt
    }
  }
`;

/* wallpaper download */
export const WALLPAPER_DOWNLOAD = gql`
    mutation wallpaperDownload($wallpaperId: ID) {
        wallpaperDownload(wallpaperId: $wallpaperId) 
    }
`;

/* wallpaper like dislike */
export const WALLPAPER_LIKE_DISLIKE = gql`
  mutation wallpaperLikeDislike($wallpaperId: ID) {
    wallpaperLikeDislike(wallpaperId: $wallpaperId) 
  }
`;

/* add wallpaper favourites */
export const ADD_WALLPAPER_TO_FAVOURITES = gql`
  mutation addWallpaperToFavourites($wallpaperId: ID) {
    addWallpaperToFavourites(wallpaperId: $wallpaperId) 
  }
`;