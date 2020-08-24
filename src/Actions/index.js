import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchArticles = () => {
    return dispatch => {
        dispatch({
            type: 'FETCH_ARTICLES'
        })
        return axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY)
            .then(res => {
                dispatch({
                            type: 'FETCH_ARTICLES_SUCCESS',
                            payload: res.data.articles
                       })
            })
            .catch((error) => {
                dispatch({
                    type: 'FETCH_ARTICLES_ERROR',
                    payload: error.response.data.message
                })
            })
    }
}

export const fetchArticle = (searchValue) => {
    return dispatch => {
        dispatch({
            type: 'FETCH_ARTICLES'
        })
        return axios.get('http://newsapi.org/v2/everything?q='+{searchValue}+'&from=2020-07-17&sortBy=publishedAt&apiKey=' + API_KEY)
            .then(res => {
                dispatch({
                    type: 'FILTER_ARTICLE_SUCCESS',
                    payload: {
                        article: res.data.articles,
                        searchValue: searchValue
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'FILTER_ARTICLE_ERROR',
                    payload: error.response.data.message
                })
            })
    }
}


export const getArticle = (title) => {
    return {
        type: "GET_ARTICLE",
        payload: title
    }
}