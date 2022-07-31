function showWinners() {
    (document.querySelector('.winners_section') as HTMLElement).classList.add('active');
}

function showGarage() {
    (document.querySelector('.winners_section') as HTMLElement).classList.remove('active');
}

export { showGarage, showWinners };
