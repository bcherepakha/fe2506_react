import React from 'react';
import AppActions from '../Flux/AppActions';

import './Beer.css';

class Beer extends React.Component {
    addFavour = () => {
        AppActions.addFavour(this.props.beer.id);
    }

    removeFavour = () => {
        AppActions.removeFavour(this.props.beer.id);
    }

    render() {
        const {beer, favourite} = this.props,
            {image_url, name, brewers_tips} = beer;

        return <div className={['beer', favourite && 'beer--favourite'].filter(Boolean).join(' ')}>
            <h3 className='beer__title'>
                {name}
            </h3>
            <img src={image_url} alt={name} className='beer__image'/>
            <div className='beer__tips'>
                {brewers_tips}
            </div>
            {favourite
                ? <button onClick={this.removeFavour}>Удалить из избранных</button>
                : <button onClick={this.addFavour}>Добавить в избранное</button>
            }
        </div>
    }
}

export default Beer;
