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

    // ============================================================
    // CONFIGURATION: Replace these values with your EmailJS keys
    // ============================================================
    const YOUR_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    const YOUR_SERVICE_ID = 'YOUR_SERVICE_ID';
    const YOUR_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    // ============================================================

    const submitBtn = form.querySelector('button[type="submit"]');
    const statusMsg = form.querySelector('.form-message');
    const originalBtnHTML = submitBtn.innerHTML;

    // Show sending status
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    if (statusMsg) {
      statusMsg.style.display = 'none';
      statusMsg.style.color = '';
      statusMsg.textContent = '';
    }

    if (typeof emailjs === 'undefined') {
      console.error('EmailJS SDK is not loaded.');
      if (statusMsg) {
        statusMsg.textContent = 'Error: EmailJS is not loaded correctly.';
        statusMsg.style.color = '#e63946';
        statusMsg.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      return;
    }

    // Initialize EmailJS
    emailjs.init({
      publicKey: YOUR_PUBLIC_KEY
    });

    // Prepare template params matching fields
    const templateParams = {
      name: form.querySelector('#name').value,
      email: form.querySelector('#email').value,
      subject: form.querySelector('#subject').value,
      message: form.querySelector('#message').value,
      to_email: 'armanayak75@gmail.com'
    };

    // Send the email
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams)
      .then(() => {
        // Success
        if (statusMsg) {
          statusMsg.textContent = 'Thanks! Your message has been sent successfully.';
          statusMsg.style.color = '#247856';
          statusMsg.style.display = 'block';
        }
        form.reset();
      })
      .catch((error) => {
        // Failure
        console.error('EmailJS Error:', error);
        if (statusMsg) {
          statusMsg.textContent = 'Failed to send message. Please try again later.';
          statusMsg.style.color = '#e63946';
          statusMsg.style.display = 'block';
        }
      })
      .finally(() => {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      });
  });
});

document.querySelectorAll('[data-resume-download]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});
