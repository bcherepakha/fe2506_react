import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';

import Loader from './Loader/Loader';
import SearchForm from './SearchForm/SearchForm';
import BeerList from './BeerList/BeerList';
import FavourBeerList from './FavourBeerList/FavourBeerList';

// import AppStore from './Flux2/AppStore';

// import AppActions from './Flux/AppActions';

import store from './Redux/AppStore';
import {loadBeerList} from './Redux/AppActions';

import logo from './logo.svg';

import './App.css';

class App extends Component {
    componentDidMount() {
        // AppActions.loadBeerList();
        // AppStore.loadBeerList();
        setTimeout(() => store.dispatch(loadBeerList()), 5000);
    }

    render() {
        return <Provider store={store}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                        <nav>
                            <NavLink
                                exact
                                to='/'
                                className='nav-link'
                                activeClassName='nav-link--selected'>
                                Главная
                            </NavLink>
                            <NavLink
                                exact
                                to='/favourite'
                                className='nav-link'
                                activeClassName='nav-link--selected'>
                                Избранное
                            </NavLink>
                        </nav>
                    </header>
                    <SearchForm/>
                    <Route exact path="/" component={BeerList}/>
                    <Route exact path="/favourite" component={FavourBeerList}/>
                    <Loader/>
                </div>
            </Router>
        </Provider>;
    }
}

export default App;
