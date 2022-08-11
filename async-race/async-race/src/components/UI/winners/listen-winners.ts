import { WINNERS_ON_Page } from '../../../constants/constants';
import state from '../../state/state';
import { updateWinnersContainer } from './winners-section';

const listenWinnersPagination = (): void => {
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

const listenWinnersSorting = () => {
    const sorting = document.getElementById('sort-winners') as HTMLSelectElement;
    sorting.addEventListener('change', async () => {
        state.sortBy = sorting.value.split(' ')[0];
        state.sortOrder = sorting.value.split(' ')[1];
        await updateWinnersContainer();
    });
};

export const listenWinners = () => {
    listenWinnersPagination();
    listenWinnersSorting();
};
