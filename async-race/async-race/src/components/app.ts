import { listenCar } from './UI/garage/listen-garage';
import { pageRender } from './UI/page-render';

function appStart() {
    pageRender();
    listenCar();
}

export { appStart };
