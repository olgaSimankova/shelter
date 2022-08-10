import { WINNERS_ON_Page } from '../../../constants/constants';
import state from '../../state/state';
import { updateWinnersContainer } from './winners-section';

export const listenWinners = (): void => {
    const winnersPagination = document.querySelector('.winners_pagination') as HTMLElement;
    winnersPagination.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('next_page')) {
            if (state.winnersQuantity / WINNERS_ON_Page >= state.winnersPage) {
                state.winnersPage += 1;
                await updateWinnersContainer();
            }
        }
        if ((event.target as HTMLElement).classList.contains('prev_page')) {
            if (state.winnersPage > 1) {
                state.winnersPage -= 1;
                await updateWinnersContainer();
            }
        }
    });
};
