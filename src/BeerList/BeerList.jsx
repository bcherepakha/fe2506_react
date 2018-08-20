import React from 'react';
import Beer from '../Beer/Beer';
import AppStore from '../Flux/AppStore';

import './BeerList.css';

export default class BeerList extends React.Component {
    state = {
        beerList: AppStore.beerList,
        favouriteBeer: AppStore.favouriteBeer
    }

    componentWillMount() {
        AppStore.bind('beer-list-update', this.getBeerList)
        AppStore.bind('favourite-beer-list-update', this.getBeerList)
    }

    componentWillUnmount() {
        AppStore.unbind('beer-list-update', this.getBeerList)
        AppStore.bind('favourite-beer-list-update', this.getBeerList)
    }

    getBeerList = () => {
        this.setState({
            beerList: AppStore.beerList,
            favouriteBeer: AppStore.favouriteBeer
        });
        // this.forceUpdate();
    }

    render() {
        const {beerList, favouriteBeer} = this.state;

        return <div className='beer-list'>
            {beerList && beerList.length > 0 &&
                beerList.map(beer => <Beer key={beer.id} beer={beer} favourite={favouriteBeer[beer.id]}/>)}
        </div>;
    }
}
