import gql from "graphql-tag";

/* user detail */
export const GET_USER_DETAILS = gql`
  query getUserDetails {
    getUserDetails {
      _id
      role
      favourites
      createdAt
    }
  }
`;

/* categories */
export const GET_CATEGORIES = gql`
  query getCategories($limit: Int,$skip: Int, $keyword: String) {
    getCategories(limit: $limit, skip: $skip, keyword: $keyword) {
        categories {
            _id
            name
            createdAt
        }
        total
    }
  }
`;

/* wallpapers */
export const GET_WALLPAPERS = gql`
  query getWallpapers($limit: Int,$skip: Int, $keyword: String, $categoryId: String, $isFavourites: Boolean, $type: String) {
    getWallpapers(limit: $limit, skip: $skip, keyword: $keyword, categoryId: $categoryId, isFavourites: $isFavourites, type: $type) {
        wallpapers {
            _id
            name
            image
            likes
            downloads
            isFeatured
            categoryId {
                _id
                name
            }
            createdAt
        }
        total
    }
  }
`;

/* wallpaper details */
export const GET_WALLPAPER_DETAILS = gql`
  query getWallpaperDetails($wallpaperId: ID) {
    getWallpaperDetails(wallpaperId: $wallpaperId) {
      _id
      name
      image
      likes
      downloads
      isFeatured
      categoryId {
          _id
          name
      }
      createdAt
    }
  }
`;