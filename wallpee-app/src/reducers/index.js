import { combineReducers } from 'redux';
import wallpaperReducer from './wallpaper';
import userReducer from './user';
import categoryReducer from './category';

export default combineReducers({
    wallpaper: wallpaperReducer,
    user: userReducer,
    category: categoryReducer
});
