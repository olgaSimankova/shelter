import Loader from './loader';
import { MYAPIKEY } from '../../constants/constants';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: MYAPIKEY,
        });
    }
}

export default AppLoader;
