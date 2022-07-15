import './css/style.scss';

const MAIN_NAV: HTMLElement = document.getElementById('main_nav'),
    BURGER_BUTTON: HTMLElement = document.querySelector('.nav__burger'),
    MOBILE_NAV: HTMLElement = document.querySelector('.nav__links'),
    UP_BUTTON: HTMLElement = document.querySelector('.scroll_top'),
    CONTENT_LINKS: NodeListOf<HTMLElement> = document.querySelectorAll('[href^="#"]'),
    CONTENT_PARTS: NodeListOf<HTMLDListElement> = document.querySelectorAll('.section__content'),
    FORM: HTMLFormElement = document.getElementById('form') as HTMLFormElement,
    FORM_RESPONSE: HTMLParagraphElement = document.querySelector('.form__response');

['DOMContentLoaded', 'scroll'].forEach(event => {
    document.addEventListener(event, (): void => {
        let posY: number = window.scrollY;

        posY > 0 ? MAIN_NAV.classList.add('scrolled') : MAIN_NAV.classList.remove('scrolled');

        posY > window.innerHeight ? UP_BUTTON.classList.add('shown') : UP_BUTTON.classList.remove('shown');

        //add animation class to dedicated elements
        CONTENT_PARTS.forEach(el => {
            let elPosTop = el.offsetTop;
            if (posY + window.innerHeight / 2 >= elPosTop) {
                let animatedBlock: HTMLElement = el.querySelector('.drop_down');
                return animatedBlock ? animatedBlock.classList.add('shown') : false;
            }
        });
    });
});

BURGER_BUTTON.addEventListener('click', function (): void {
    return this.classList.contains('enabled') ? [this, MOBILE_NAV].forEach(el => el.classList.remove('enabled')) :
        [this, MOBILE_NAV].forEach(el => el.classList.add('enabled'));
});

UP_BUTTON.addEventListener('click', (): void => {
    return window.scrollTo({top: 0, behavior: 'smooth'});
});

CONTENT_LINKS.forEach(el => {
    el.onclick = (event: MouseEvent) => {
        event.preventDefault();

        if (!el.classList.contains('active')) {
            const ELID: string = el.getAttribute('href'),
                ACTIVE: HTMLElement = document.querySelector(ELID),
                SIBLINGS: Array<Element> = Array.from(ACTIVE.parentElement.children).filter(ch => ch != ACTIVE);

            ACTIVE.classList.add('active');
            SIBLINGS.forEach(sibling => sibling.classList.remove('active'));

            Array.from(MOBILE_NAV.children).forEach(child => {
                child.classList.remove('active');
                if (child.getAttribute('href') === ELID) {
                    child.classList.add('active');
                }
            });

            //remove animation class from dedicated elements after switching content tabs
            CONTENT_PARTS.forEach(el => {
                let animatedBlock: HTMLElement = el.querySelector('.drop_down');
                return animatedBlock ? animatedBlock.classList.remove('shown') : false;
            });

            //close float nav and set burger to initial position on mobile devices
            if (MOBILE_NAV.classList.contains('enabled')) {
                [BURGER_BUTTON, MOBILE_NAV].forEach(el => el.classList.remove('enabled'));
            }
        }
    }
});

FORM.onsubmit = async (e) => {
    e.preventDefault();

    let isValidForm = true;

    const DATA: { [index: string]: any } = {},
        FORM_ELEMENTS: any = Array.from(FORM),
        SUBMIT_BTN: HTMLElement = e.submitter;

    SUBMIT_BTN.setAttribute('disabled', 'true');

    FORM_ELEMENTS.map((input: { type: string; name: string; value: string; }) => {
        (DATA[input.name] = input.value.trim())
    });

    FORM_ELEMENTS.forEach((el: { value: string; type: string; }) => {
        if (el.value.trim().length < 1 && el.type != 'submit') {
            FORM_RESPONSE.classList.add('err');
            FORM_RESPONSE.innerHTML = 'Please complete all fields';
            return isValidForm = false;
        }
    })

    if (isValidForm) {
        FORM_RESPONSE.innerHTML = '';

        const response = await fetch(FORM.action, {
            method: FORM.method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(DATA)
        });

        if (response.ok) {
            FORM.reset();
            FORM_RESPONSE.classList.remove('err');
            FORM_RESPONSE.innerHTML = 'Thanks for the message. I’ll be in touch shortly';
        } else {
            FORM_RESPONSE.classList.add('err');
            FORM_RESPONSE.innerHTML = 'Something went wrong';
            console.error(response.statusText);
        }
    }

    SUBMIT_BTN.removeAttribute('disabled');
}

window.onload = () => document.body.style.opacity = '1';






