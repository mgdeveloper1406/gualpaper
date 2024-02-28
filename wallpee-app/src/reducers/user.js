const initialState = {
    user: { token: null },
    error: null,
    loading: true
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.data };
        case 'USER_LOADING':
            return { ...state, loading: action.isLoading };
        case 'USER_ERROR':
            return { ...state, error: action.error };
        case 'SET_TOKEN':
            return { ...state, user: { ...state.user, token: action.token, loading: false }};
        case 'SET_FAVOURITES':
            const favourites = state?.user?.favourites ? [...state?.user?.favourites] : []
            const index = favourites?.findIndex(favouriteId => favouriteId === action?.wallpaperId)
            index > -1 ? favourites.splice(index, 1) : favourites.push(action?.wallpaperId)
            return { ...state, user: { ...state.user, favourites }};
        default:
            return state;
    }
};
