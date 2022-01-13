const menuEl = document.querySelector('.menu-link');
const navLinkEl = document.querySelector('.nav-link-1 img');

navLinkEl.addEventListener('click', ()=>{
    menuEl.classList.toggle('menu-link-show');
});
