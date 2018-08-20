/* Классическая библиотека flux (https://facebook.github.io/flux/docs/overview.html)
 * предоставляет нам только Dispatcher, но нам больше ничего и не нужно
 */
import {Dispatcher} from 'flux';

const iDispatcher = new Dispatcher();

//add logs
iDispatcher.register(console.log);

export default {
    iDispatcher,
    loadBeerList: function() {
        iDispatcher.dispatch({
            eventName: 'LOAD_BEER_LIST'
        });
    },
    startSearch: function(searchText) {
        iDispatcher.dispatch({
            eventName: 'START_SEARCH',
            searchText
        });
    },
    addFavour: function(beerId) {
        iDispatcher.dispatch({
            eventName: 'ADD_BEER_TO_FAVOUR',
            beerId
        });
    },
    removeFavour: function(beerId) {
        iDispatcher.dispatch({
            eventName: 'REMOVE_BEER_TO_FAVOUR',
            beerId
        });
    },
    showLoader: function() {
        iDispatcher.dispatch({
            eventName: 'LOADER_SHOW'
        });
    },
    hideLoader: function() {
        iDispatcher.dispatch({
            eventName: 'LOADER_HIDE'
        });
    }
};
