import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'e577515cb83c4b09a7403bae5348d7ef',
        });
    }
}

export default AppLoader;
