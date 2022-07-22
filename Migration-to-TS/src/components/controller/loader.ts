import { GetRespObject, options, SourcesData, urlOptions } from '../../types/types';
import { NOTFOUND, UNAUTORIZED } from '../../constants/constants';

class Loader {
    baseLink: string;
    options: options;

    constructor(baseLink: string, options: options) {
        this.baseLink = baseLink;
        this.options = options;
        this.errorHandler.bind(this);
    }

    getResponce(
        { endpoint, options }: GetRespObject,
        callback: (data: SourcesData) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === UNAUTORIZED || res.status === NOTFOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: options, endpoint: string): string {
        const urlOptions: urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: SourcesData) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}
export default Loader;
