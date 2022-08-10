import { WINNERS_ON_Page } from '../../../constants/constants';
import { getWinners } from '../../API/api';
import state from '../../state/state';
import { getCarImg } from '../car-on-road-render';

async function getWinnersContainer(): Promise<HTMLElement> {
    const { items, count } = await getWinners(state.winnersPage, WINNERS_ON_Page, '', '');
    if (count) state.winnersQuantity = +count;
    const section = document.createElement('div');
    section.setAttribute('class', 'winners_section');
    section.innerHTML = `<h2 class="section_title">Winners</h2>
    <span class="winners_counter section_counter">(${count})</span>
    <div class='pagination winners_pagination'>
        <h3 class="page_title">Page</h3><span class="winners_page_number page_number">#${state.winnersPage}</span>
        <button class="prev_page btn">back</button>
        <button class="next_page btn">next</button>
    </div>`;
    const winnersTable = document.createElement('div');
    winnersTable.setAttribute('id', 'winners_table');
    let innerTable = '<table><tr><th>No</th><th>IMG</th><th>Name</th><th>Wins</th><th>Time</th></tr>';
    for (let i = 0; i < items.length; i++) {
        const img = getCarImg(items[i].car.color, items[i].id);
        innerTable += `<tr><td>${i + 1}</td><td>${img.innerHTML}</td><td>${items[i].car.name}</td><td>${
            items[i].wins
        }</td><td>${items[i].time}</td></tr>`;
    }
    innerTable += '</table>';
    winnersTable.innerHTML = innerTable;
    section.innerHTML += winnersTable.innerHTML;
    return section;
}

async function updateWinnersContainer() {
    const { items, count } = await getWinners(state.winnersPage, WINNERS_ON_Page, '', '');
    (document.querySelector('.winners_counter') as HTMLElement).innerText = `(${count})`;
    const pageNumber = document.querySelector('.winners_page_number') as HTMLElement;
    pageNumber.innerText = `#${state.winnersPage}`;
    const table = document.querySelector('table');
    (table as HTMLElement).innerHTML = '';
    let innerTable = '<table><tr><th>No</th><th>IMG</th><th>Name</th><th>Wins</th><th>Time</th></tr>';
    for (let i = 0; i < items.length; i++) {
        const img = getCarImg(items[i].car.color, items[i].id);
        innerTable += `<tr><td>${i + 1}</td><td>${img.innerHTML}</td><td>${items[i].car.name}</td><td>${
            items[i].wins
        }</td><td>${items[i].time}</td></tr>`;
    }
    innerTable += '</table>';
    (table as HTMLElement).innerHTML = innerTable;
}

export { getWinnersContainer, updateWinnersContainer };
