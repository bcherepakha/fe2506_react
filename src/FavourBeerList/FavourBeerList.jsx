import { connect } from 'react-redux';

import {BeerList, mapDispatchToProps} from '../BeerList/BeerList';
// import AppStore from '../Flux/AppStore';

// export default class FavourBeerList extends BeerList {
//     state = {
//         beerList: this.getFavourBeerList(),
//         favouriteBeer: AppStore.favouriteBeer
//     }
//
//     getFavourBeerList() {
//         const {beerList, favouriteBeer} = AppStore;
//
//         return beerList.filter(beer => favouriteBeer[beer.id]);
//     }
//
//     getBeerList = () => {
//         this.setState({
//             beerList: this.getFavourBeerList(),
//             favouriteBeer: AppStore.favouriteBeer
//         });
//         // this.forceUpdate();
//     }
// }

const mapStateToProps = state => ({
  beerList: state.beer.list.filter(beer => state.beer.favourite[beer.id]),
  favouriteBeer: state.beer.favourite
});
 
export default connect(mapStateToProps, mapDispatchToProps)(BeerList);
