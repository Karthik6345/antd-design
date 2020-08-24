var initialState = {
    articles: [],
    article:[],
    filterArticles:[],
    searchValue:undefined,
    isLoading: false,
    isLoaded: false
}
const articleReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'FETCH_ARTICLES':
            return {
                ...state,
                isLoading: true,
            };
         case 'FETCH_ARTICLES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                articles: action.payload
            };
        case 'FETCH_ARTICLES_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
         case 'FILTER_ARTICLE_SUCCESS':
         return {
             ...state,
             isLoading: false,
             searchValue: action.payload.searchValue,
             filterArticles: action.payload.article
         };
         case 'FILTER_ARTICLE_ERROR':
         return {
             ...state,
             isLoading: false,
             error: action.payload
         };
        case 'GET_ARTICLE':
            return {
                ...state,
                article: [...state.articles, ...state.filterArticles].filter(article => article.title.toLowerCase() === action.payload.toLowerCase()),
            };
        default:
            return state;
    }
}

export default articleReducer
