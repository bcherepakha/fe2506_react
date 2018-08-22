import React from 'react';
import { connect } from 'react-redux';
// import LoaderStore from './LoaderStore';

import './Loader.css';

export class Loader extends React.PureComponent {
    // state = {
    //     show: false
    // }
    //
    // componentWillMount() {
    //     LoaderStore.bind('loader-toggle', this.update)
    // }
    //
    // componentWillUnmount() {
    //     LoaderStore.unbind('loader-toggle', this.update)
    // }
    //
    // update = () => this.setState({show: LoaderStore.show})

    render() {
        return <div className={[
                'loader',
                !this.props.show &&'loader--hidden'
            ].filter(Boolean).join(' ')}/>;
    }
}

const mapStateToProps = state => ({
    show: state.loader
});

export default connect(mapStateToProps)(Loader);
