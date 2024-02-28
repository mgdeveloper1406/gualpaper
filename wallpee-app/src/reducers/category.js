const initialState = {
    categories: [],
    loading: true,
    error: null
};

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return { ...state, categories: action.data.data}
        case 'CATEGORY_LOADING':
            return { ...state, loading: action.data };
        case 'CATEGORY_ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};
