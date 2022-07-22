import Loader from './loader';
import { MYAPIKEY, NEWSAPI } from '../../constants/constants';

class AppLoader extends Loader {
    constructor() {
        super(NEWSAPI, {
            apiKey: MYAPIKEY,
        });
    }
}

export default AppLoader;
