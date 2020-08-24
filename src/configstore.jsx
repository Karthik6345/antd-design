import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer';

const configstore = () => {
    const store = createStore(
        rootReducer, applyMiddleware(thunk)
    );
    return store;
};

export default configstore;