import {
    combineReducers,
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import iFetch from '../iFetch/iFetch';
import {loaderShow, loaderHide} from './AppActions';

const initBeerState = {
    list: [],
    favourite: {}
}

const favouriteBeer = localStorage.getItem('favouriteBeer'),
    favouriteBeerList = localStorage.getItem('favouriteBeerList');

if (favouriteBeer) {
    try {
        initBeerState.favourite = JSON.parse(favouriteBeer);
        initBeerState.list = JSON.parse(favouriteBeerList);
    } catch (ex) {
        console.log(ex);
    }
}

function getFavouriteBeer(beer) {
    const {list, favourite} = beer;

    return list.filter(beer => favourite[beer.id]);
}

const beer = (state = initBeerState, action) => {
    switch (action.type) {
        case 'CHANGE_BEERLIST':
            return {
                ...state,
                list: action.beerList
            };
        case 'LOAD_BEER_LIST_SUCCESS':
        case 'START_SEARCH_SUCCESS':
            return {
                ...state,
                list: action.data
            };
        case 'ADD_BEER_TO_FAVOUR':
            const newState = {
                ...state,
                favourite: {
                    ...state.favourite,
                    [action.beerId]: true // favourite[action.beerId] = true
                }
            };

            localStorage.setItem('favouriteBeerList', JSON.stringify(getFavouriteBeer(newState)));
            localStorage.setItem('favouriteBeer', JSON.stringify(newState.favourite));
            return newState;
        case 'REMOVE_BEER_FROM_FAVOUR':
            const removeState = {
                ...state,
                favourite: {
                    ...state.favourite
                }
            };

            delete removeState.favourite[action.beerId];

            localStorage.setItem('favouriteBeerList', JSON.stringify(getFavouriteBeer(removeState)));
            localStorage.setItem('favouriteBeer', JSON.stringify(removeState.favourite));
            return removeState;
        default:
            return state
    }
};

const loader = (state = false, action) => {
    switch (action.type) {
        case 'LOADER_SHOW':
            return true;
        case 'LOADER_HIDE':
            return false;
        default:
            return state;
    }
}

const loggerMiddleware = store => next => action => {
    console.log('dispatch', action);
    next(action);
}

const fetchMiddleware = store => next => action => {
    if (action.fetch) {
        store.dispatch(loaderShow());
        iFetch(action.fetch)
            .then(data => {
                store.dispatch(loaderHide());
                next({
                    ...action,
                    type: `${action.type}_SUCCESS`,
                    data
                });
            })
            .catch(error => {
                store.dispatch(loaderHide());
                next({
                    ...action,
                    type: `${action.type}_ERROR`,
                    error
                });
            });
    } else {
        next(action);
    }
}

const confirmMiddleware = store => next => action => {
    if (action.confirm) {
        if (window.confirm(action.confirm)) {
            next(action)
        } else {
            next({
                ...action,
                type: `${action.type}_CANCEL`,
            })
        }
    } else {
        next(action);
    }
}

// const store = createStore(beer);
const store = createStore(
    combineReducers({
        beer,
        loader
    }),
    compose(
        applyMiddleware(loggerMiddleware),
        applyMiddleware(fetchMiddleware),
        applyMiddleware(confirmMiddleware)
    )
);

export default store;
