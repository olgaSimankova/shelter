import { listenWinners } from '../UI/winners/listen-winners';
import { updateWinnersContainer } from '../UI/winners/winners-section';

function showWinners(): void {
    (document.querySelector('.winners_section') as HTMLElement).classList.add('active');
    updateWinnersContainer();
    listenWinners();
}

function showGarage(): void {
    (document.querySelector('.winners_section') as HTMLElement).classList.remove('active');
}

export { showGarage, showWinners };
