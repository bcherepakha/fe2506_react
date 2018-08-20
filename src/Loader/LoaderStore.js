import MicroEvent from 'microevent';
import AppActions from '../Flux/AppActions';

const LoaderStore = new MicroEvent();

// add Dispatcher
AppActions.iDispatcher.register(payload => {
    switch (payload.eventName) {
        case 'loaderShow':
            LoaderStore.show = true;
            LoaderStore.trigger('loader-toggle');
            break;
        case 'loaderHide':
            LoaderStore.show = false;
            LoaderStore.trigger('loader-toggle');
            break;
    }

    return true;
});

export default LoaderStore;
