const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('.form-message');
    if (message) message.style.display = 'block';
    form.reset();
  });
});

document.querySelectorAll('[data-resume-download]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});
