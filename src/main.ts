import './css/style.scss';

const NAV = document.getElementById('main_nav') as HTMLElement,
    BURGER_BUTTON = document.querySelector('.nav__burger') as HTMLElement,
    MOBILE_NAV = document.querySelector('.nav__links') as HTMLElement,
    UP_BUTTON = document.querySelector('.scroll_top') as HTMLElement;

['DOMContentLoaded', 'scroll'].forEach(event => {
    document.addEventListener(event, function(): void {
        let posY: number = window.scrollY;
        posY > 0 ? NAV.classList.add('scrolled') : NAV.classList.remove('scrolled');
        posY > window.innerHeight ? UP_BUTTON.classList.add('shown') : UP_BUTTON.classList.remove('shown');
    })
});

BURGER_BUTTON.addEventListener('click', function () : void {
    if (this.classList.contains('enabled')) {
        [this, MOBILE_NAV].forEach(el => el.classList.remove('enabled'));
    }
    else {
        [this, MOBILE_NAV].forEach(el => el.classList.add('enabled'));
    }
});

UP_BUTTON.addEventListener('click', function () : void {
    window.scrollTo({top: 0,behavior: 'smooth'});
})