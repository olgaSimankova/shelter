function showWinners() {
    (document.querySelector('.winners_section') as HTMLElement).classList.add('active');
    console.log('click');
}

function showGarage() {
    (document.querySelector('.winners_section') as HTMLElement).classList.remove('active');
    console.log('click');
}

export { showGarage, showWinners };
