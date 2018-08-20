import React from 'react';
import LoaderStore from './LoaderStore';

import './Loader.css';

export default class Loader extends React.PureComponent {
    state = {
        show: false
    }

    componentWillMount() {
        LoaderStore.bind('loader-toggle', this.update)
    }

    componentWillUnmount() {
        LoaderStore.unbind('loader-toggle', this.update)
    }

    update = () => this.setState({show: LoaderStore.show})

    render() {
        return <div className={[
                'loader',
                !this.state.show &&'loader--hidden'
            ].filter(Boolean).join(' ')}/>;
    }
}
