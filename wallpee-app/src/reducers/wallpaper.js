const initialState = {
    search: { wallpapers: [], total: 1, loading: false },
    category: { wallpapers: [], total: 1, loading: false },
    recent: { wallpapers: [], total: 1, loading: false },
    trending: { wallpapers: [], total: 1, loading: false },
    featured: { wallpapers: [], total: 1, loading: false },
    favourites: { wallpapers: [], total: 1, loading: false },
    error: null
};

export default function wallpaperReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_WALLPAPERS':
            if (action.data.type && action.data.type == 'search') {
                return {
                    ...state,
                    search: { wallpapers: action.data.skip && action.data.skip > 0 ? [...state.search.wallpapers, ...action.data.data.wallpapers] : action.data.data.wallpapers, total: action.data.data.total }
                }
            } else if (action.data.type && action.data.type == 'category') {
                return {
                    ...state,
                    category: { wallpapers: action.data.skip && action.data.skip > 0 ? [...state.category.wallpapers, ...action.data.data.wallpapers] : action.data.data.wallpapers, total: action.data.data.total }
                }
            } else if (action.data.type && action.data.type == 'recent') {
                return {
                    ...state,
                    recent: { wallpapers: action.data.skip && action.data.skip > 0 ? [...state.recent.wallpapers, ...action.data.data.wallpapers] : action.data.data.wallpapers, total: action.data.data.total }
                }
            } else if (action.data.type && action.data.type == 'trending') {
                return {
                    ...state,
                    trending: { wallpapers: action.data.skip && action.data.skip > 0 ? [...state.trending.wallpapers, ...action.data.data.wallpapers] : action.data.data.wallpapers, total: action.data.data.total }
                }
            } else if (action.data.type && action.data.type == 'featured') {
                return {
                    ...state,
                    featured: { wallpapers: action.data.skip && action.data.skip > 0 ? [...state.featured.wallpapers, ...action.data.data.wallpapers] : action.data.data.wallpapers, total: action.data.data.total }
                }
            } else if (action.data.type && action.data.type == 'favourites') {
                return {
                    ...state,
                    favourites: { wallpapers: action.data.skip && action.data.skip > 0 ? [...state.favourites.wallpapers, ...action.data.data.wallpapers] : action.data.data.wallpapers, total: action.data.data.total }
                }
            }
        case 'WALLPAPER_LOADING':
            return { ...state, [action.data.type]: { ...state[action.data.type], 'loading': action.data.isLoading }};
        case 'WALLPAPER_ERROR':
            return { ...state, error: action.error };
        case 'CLEAR_WALLPAPERS':
            return { ...initialState }
        default:
            return state;
    }
};
