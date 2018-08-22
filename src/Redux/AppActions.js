export const addFavour = beerId => ({
    type: 'ADD_BEER_TO_FAVOUR',
    beerId
});

export const removeFavour = beerId => ({
    confirm: 'Are you shure?',
    type: 'REMOVE_BEER_FROM_FAVOUR',
    beerId
});

export const loadBeerList = () => ({
    type: 'LOAD_BEER_LIST',
    fetch: {
        method: 'GET',
        url: 'https://api.punkapi.com/v2/beers'
    }
});

export const startSearch = value => ({
    type: 'START_SEARCH',
    fetch: {
        method: 'GET',
        url: ['https://api.punkapi.com/v2/beers', value && `beer_name=${value}`]
            .filter(Boolean).join('?')
    }
});

export const loaderShow = () => ({
    type: 'LOADER_SHOW'
});

export const loaderHide = () => ({
    type: 'LOADER_HIDE'
})
