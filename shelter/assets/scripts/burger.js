// ----------------burger nav----------------
const header = document.querySelector('.header');
const burgerBtn = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('.body')

const openNav = () => {
    header.classList.add('open');
    burgerBtn.classList.add('open');
    navigation.classList.add('open');
    overlay.classList.remove('hidden');
    body.style.overflow = 'hidden';
};

const closeNav = () => {
    header.classList.remove('open');
    burgerBtn.classList.remove('open');
    navigation.classList.remove('open');
    overlay.classList.add('hidden');
    body.style.overflow = 'scroll';
};

burgerBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('open')) {
        closeNav();
    } else {
        openNav();
    }
});

overlay.addEventListener('click', (e) => {
    if (!e.target.classList.contains('hidden')) {
        closeNav();
    }
});

navigation.addEventListener('click', (e) => {
    if (e.target.closest('.navigation__link')) {
        setTimeout(() => {
            closeNav();
        }, 200);
    }
});
