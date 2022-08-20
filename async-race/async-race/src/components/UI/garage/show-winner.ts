import { INewCar } from '../../../types/types';
import { resetAll } from '../../controllers/race-all';

export const renderWinnerModal = () => {
    const modal = document.createElement('div');
    modal.innerHTML = `<div class="winner_modal background_container">
    <div class="winner_container">
        <span class="winner" id="show_winner"></span>
    </div>
</div>`;
    return modal;
};

export const showWinner = (car: INewCar, time: number): void => {
    const winnerText = document.getElementById('show_winner') as HTMLElement;
    winnerText.innerText = `WINNER: ${car.name} with time: ${time}`;
    const winnercontainer = document.querySelector('.background_container') as HTMLDivElement;
    winnercontainer.classList.toggle('active', true);
    winnercontainer.addEventListener('click', async () => {
        winnercontainer.classList.toggle('active', false);
        await resetAll();
    });
};
