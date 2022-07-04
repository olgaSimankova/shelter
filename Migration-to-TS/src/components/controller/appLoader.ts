import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'e577515cb83c4b09a7403bae5348d7ef',
        });
    }
}

export default AppLoader;
