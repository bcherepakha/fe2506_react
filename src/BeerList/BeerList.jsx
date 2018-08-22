import { connect } from 'react-redux';

import React from 'react';
import Beer from '../Beer/Beer';
// import AppStore from '../Flux/AppStore';

import {addFavour, removeFavour} from '../Redux/AppActions';

import './BeerList.css';

export class BeerList extends React.Component {
    // state = {
    //     beerList: AppStore.beerList,
    //     favouriteBeer: AppStore.favouriteBeer
    // }

    // componentWillMount() {
    //     AppStore.bind('beer-list-update', this.getBeerList)
    //     AppStore.bind('favourite-beer-list-update', this.getBeerList)
    // }
    //
    // componentWillUnmount() {
    //     AppStore.unbind('beer-list-update', this.getBeerList)
    //     AppStore.bind('favourite-beer-list-update', this.getBeerList)
    // }

    // getBeerList = () => {
    //     this.setState({
    //         beerList: AppStore.beerList,
    //         favouriteBeer: AppStore.favouriteBeer
    //     });
    //     // this.forceUpdate();
    // }

    render() {
        const {beerList, favouriteBeer, addFavour, removeFavour} = this.props;

        return <div className='beer-list'>
            {beerList && beerList.length > 0 &&
                beerList.map(beer => <Beer
                    key={beer.id}
                    beer={beer}
                    favourite={favouriteBeer[beer.id]}
                    addFavour={addFavour}
                    removeFavour={removeFavour}/>)}
        </div>;
    }
}


const mapStateToProps = state => ({
  beerList: state.beer.list,
  favouriteBeer: state.beer.favourite
});
 
export const mapDispatchToProps = dispatch => ({
    addFavour: beerId => dispatch(addFavour(beerId)),
    removeFavour: beerId => dispatch(removeFavour(beerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);
