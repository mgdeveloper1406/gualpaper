import apolloClient from '../graphql/client';
import { GET_CATEGORIES } from '../graphql/queries';

export const categoryLoading = data => ({
    type: 'CATEGORY_LOADING',
    data: data,
});

export const categoryError = error => ({
    type: 'CATEGORY_ERROR',
    error,
});

export const getCategory = (data) => ({
    type: 'GET_CATEGORIES',
    data
});

export const getCategories = () => dispatch => {
    dispatch(categoryLoading(true));
    return apolloClient.query({
        query: GET_CATEGORIES,
        fetchPolicy: 'no-cache'
    })
    .then((result) => {
        if (result && result.data && result.data.getCategories && result.data.getCategories.categories) dispatch(getCategory({ data: result.data.getCategories.categories }));
        dispatch(categoryLoading(false));
    })
    .catch((err) => {
        dispatch(categoryLoading(false));
        dispatch(categoryError(err?.message || 'ERROR'));
    })
}
