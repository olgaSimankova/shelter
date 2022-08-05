import { listenCars, listenGarage, listenPagination } from './UI/garage/listen-garage';
import { pageRender } from './UI/page-render';
function appStart() {
    pageRender();
    listenGarage();
    listenCars();
    listenPagination();
}

export { appStart };
