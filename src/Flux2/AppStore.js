import MicroEvent from 'microevent';
import iFetch from '../iFetch/iFetch';

const AppStore = new MicroEvent();

AppStore.beerList = [];

AppStore.loadBeerList = () => {
    iFetch({
        method: 'GET',
        url: 'https://api.punkapi.com/v2/beers'
    })
    .then(data => {
        AppStore.beerList = data;
        AppStore.trigger('beer-list-update');
    })
    .catch(response => console.error({response}));
}

AppStore.startSearch = searchText => {
    console.log('startSearch', searchText);
    iFetch({
        method: 'GET',
        url: `https://api.punkapi.com/v2/beers?beer_name=${searchText}`
    })
    .then(data => {
        AppStore.beerList = data;
        AppStore.trigger('beer-list-update');
    })
    .catch(response => console.error({response}));
}

export default AppStore;
