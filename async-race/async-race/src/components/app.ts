import { listenGarage } from './UI/garage/listen-garage';
import { pageRender } from './UI/page-render';

function appStart() {
    pageRender();
    listenGarage();
}

export { appStart };
