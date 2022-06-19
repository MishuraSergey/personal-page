import './css/style.scss';

const NAV: HTMLElement = document.getElementById('main_nav'),
    BURGER_BUTTON: HTMLElement = document.querySelector('.nav__burger'),
    MOBILE_NAV: HTMLElement = document.querySelector('.nav__links'),
    UP_BUTTON: HTMLElement = document.querySelector('.scroll_top'),
    CONTENT_LINKS: NodeListOf<HTMLElement> = document.querySelectorAll('[href^="#"]');

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
});

CONTENT_LINKS.forEach(el => {
    el.onclick = (event:MouseEvent) => {
        event.preventDefault();

        const ELID: string = el.getAttribute('href'),
            ACTIVE: HTMLElement = document.querySelector(ELID),
            SIBLINGS: Array<Element> = Array.from(ACTIVE.parentElement.children).filter(ch=>ch!=ACTIVE);

        ACTIVE.classList.add('active');
        SIBLINGS.forEach(sibling => sibling.classList.remove('active'));

        Array.from(MOBILE_NAV.children).forEach(child => {
            child.classList.remove('active');
            if (child.getAttribute('href') === ELID){
                child.classList.add('active');
            }
        });

        //close float nav and set burger to initial position on mobile devices
        if (MOBILE_NAV.classList.contains('enabled')){
            [BURGER_BUTTON, MOBILE_NAV].forEach(el => el.classList.remove('enabled'));
        }
    }
})

