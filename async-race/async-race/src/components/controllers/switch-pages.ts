function showWinners(): void {
    (document.querySelector('.winners_section') as HTMLElement).classList.add('active');
}

function showGarage(): void {
    (document.querySelector('.winners_section') as HTMLElement).classList.remove('active');
}

export { showGarage, showWinners };
