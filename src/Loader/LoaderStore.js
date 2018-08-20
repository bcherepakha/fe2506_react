import MicroEvent from 'microevent';

const LoaderStore = new MicroEvent();

LoaderStore.showLoader = function() {
    LoaderStore.show = true;
    LoaderStore.trigger('loader-toggle');
}

LoaderStore.hideLoader = function() {
    LoaderStore.show = false;
    LoaderStore.trigger('loader-toggle');
}

export default LoaderStore;
