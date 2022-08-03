import { listenCars, listenGarage } from './UI/garage/listen-garage';
import { pageRender } from './UI/page-render';
function appStart() {
    pageRender();
    listenGarage();
    listenCars();
}

export { appStart };
