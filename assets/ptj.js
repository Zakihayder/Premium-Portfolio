/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    const item = this.parentNode;
    const isClosed = item.classList.contains('skills__close');

    for (let i = 0; i < skillsContent.length; i++){
        skillsContent[i].classList.remove('skills__open');
        skillsContent[i].classList.add('skills__close');
    }

    if(isClosed){
        item.classList.remove('skills__close');
        item.classList.add('skills__open');
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills);
});

if (skillsContent.length > 0) {
    Array.from(skillsContent).forEach((skill, index) => {
        skill.classList.toggle('skills__open', index === 0);
        skill.classList.toggle('skills__close', index !== 0);
    });
}

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active');

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal');
        });
    });
});

/*==================== PORTFOLIO CAROUSEL ====================*/
const portfolioTrack = document.querySelector('.portfolio__container .swiper-wrapper');
const portfolioNext = document.querySelector('.swiper-button-next');
const portfolioPrev = document.querySelector('.swiper-button-prev');
let portfolioPointerStartX = 0;
let portfolioScrollStartLeft = 0;
let portfolioDragging = false;

function scrollPortfolio(direction) {
    if (!portfolioTrack) return;

    const step = portfolioTrack.clientWidth;
    const maxScrollLeft = portfolioTrack.scrollWidth - portfolioTrack.clientWidth;
    const currentScrollLeft = portfolioTrack.scrollLeft;

    if (direction === 'next') {
        const nextScrollLeft = currentScrollLeft + step;
        portfolioTrack.scrollTo({
            left: nextScrollLeft >= maxScrollLeft - 4 ? 0 : nextScrollLeft,
            behavior: 'smooth'
        });
        return;
    }

    const prevScrollLeft = currentScrollLeft - step;
    portfolioTrack.scrollTo({
        left: prevScrollLeft <= 4 ? maxScrollLeft : prevScrollLeft,
        behavior: 'smooth'
    });
}

if (portfolioNext) {
    portfolioNext.addEventListener('click', () => scrollPortfolio('next'));
}

if (portfolioPrev) {
    portfolioPrev.addEventListener('click', () => scrollPortfolio('prev'));
}

if (portfolioTrack) {
    portfolioTrack.addEventListener('pointerdown', (event) => {
        portfolioDragging = true;
        portfolioPointerStartX = event.clientX;
        portfolioScrollStartLeft = portfolioTrack.scrollLeft;
        portfolioTrack.classList.add('dragging');
        portfolioTrack.setPointerCapture(event.pointerId);
    });

    portfolioTrack.addEventListener('pointermove', (event) => {
        if (!portfolioDragging) return;

        const deltaX = event.clientX - portfolioPointerStartX;
        portfolioTrack.scrollLeft = portfolioScrollStartLeft - deltaX;
    });

    const stopDragging = (event) => {
        if (!portfolioDragging) return;
        portfolioDragging = false;
        portfolioTrack.classList.remove('dragging');
        try {
            portfolioTrack.releasePointerCapture(event.pointerId);
        } catch (error) {
            // Ignore release errors when pointer capture is already gone.
        }
    };

    portfolioTrack.addEventListener('pointerup', stopDragging);
    portfolioTrack.addEventListener('pointercancel', stopDragging);
    portfolioTrack.addEventListener('pointerleave', stopDragging);
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button');

window.toggleTheme = function () {
    const icon = themeButton?.querySelector('i');
    document.body.classList.toggle('light-theme');
    if (icon) {
        icon.classList.toggle('uil-sun');
        icon.classList.toggle('uil-moon');
    }
};


/*==================== AOS ANIMATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
  if(typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
  }
    // Show contact form status when redirected with ?sent=1 or ?sent=0
    try {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('sent');
        const statusEl = document.getElementById('contact-status');
        if (status && statusEl) {
            if (status === '1') {
                statusEl.textContent = 'Message sent — thanks! I will reply soon.';
                statusEl.classList.add('contact__status--success');
            } else {
                statusEl.textContent = 'Message could not be sent. Please try again later.';
                statusEl.classList.add('contact__status--error');
            }
            statusEl.style.display = 'block';
            // remove query string from URL without reloading
            if (window.history && window.history.replaceState) {
                const url = new URL(window.location.href);
                url.searchParams.delete('sent');
                window.history.replaceState({}, document.title, url.pathname + url.hash);
            }
        }
    } catch (e) {
        // ignore
    }
});
