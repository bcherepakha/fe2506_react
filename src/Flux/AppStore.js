import AppActions from './AppActions';
import MicroEvent from 'microevent';
import iFetch from '../iFetch/iFetch';

const AppStore = new MicroEvent(),
    favouriteBeer = localStorage.getItem('favouriteBeer');

AppStore.beerList = [];
AppStore.favouriteBeer = {};

if (favouriteBeer) {
    try {
        AppStore.favouriteBeer = JSON.parse(favouriteBeer);
    } catch (ex) {
        console.log(ex);
    }
}

// add Dispatcher
AppActions.iDispatcher.register(payload => {
    switch (payload.eventName) {
        case 'LOAD_BEER_LIST':
            iFetch({
                method: 'GET',
                url: 'https://api.punkapi.com/v2/beers'
            })
            .then(data => {
                AppStore.beerList = data;
                AppStore.trigger('beer-list-update');
            })
            .catch(response => console.error({response}));
            break;
        case 'START_SEARCH':
            iFetch({
                method: 'GET',
                url: `https://api.punkapi.com/v2/beers?beer_name=${payload.searchText}`
            })
            .then(data => {
                AppStore.beerList = data;
                AppStore.trigger('beer-list-update');
            })
            .catch(response => console.error({response}));
            break;
        case 'ADD_BEER_TO_FAVOUR':
            AppStore.favouriteBeer[payload.beerId] = true;
            localStorage.setItem('favouriteBeer', JSON.stringify(AppStore.favouriteBeer));
            AppStore.trigger('favourite-beer-list-update');
            break;
        case 'REMOVE_BEER_TO_FAVOUR':
            delete AppStore.favouriteBeer[payload.beerId];
            localStorage.setItem('favouriteBeer', JSON.stringify(AppStore.favouriteBeer));
            AppStore.trigger('favourite-beer-list-update');
            break;
        default:
            console.log('unknown event', payload.eventName);
            break;
    }

    return true;
});

export default AppStore;
