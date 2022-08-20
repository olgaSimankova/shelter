import { listenWinners } from '../UI/winners/listen-winners';
import { updateWinnersContainer } from '../UI/winners/winners-section';

async function showWinners(): Promise<void> {
    (document.querySelector('.winners_section') as HTMLElement).classList.add('active');
    await updateWinnersContainer();
    listenWinners();
}

function showGarage(): void {
    (document.querySelector('.winners_section') as HTMLElement).classList.remove('active');
}

export { showGarage, showWinners };
