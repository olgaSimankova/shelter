import { listenGarage } from './UI/garage/listen-garage';
import { pageRender } from './UI/page-render';
async function appStart() {
    await pageRender();
    listenGarage();
}

export { appStart };
