document.addEventListener('DOMContentLoaded', function () {

    initJobTabs();
    updateText('es');

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const messageDiv = document.getElementById('form-message');
            const submitButton = form.querySelector('button[type="submit"]');
            const currentLang = 'es';

            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando... <i data-lucide="loader" class="w-5 h-5 ml-2 animate-spin"></i>';
            lucide.createIcons();

            try {
                const formData = new FormData(form);
                const res = await fetch('https://formcarry.com/s/z_3Rrrsdm9O', {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' },
                });

                if (res.ok) {
                    form.reset();
                    messageDiv.classList.remove('hidden');
                    messageDiv.style.color = 'var(--lila)';
                    messageDiv.innerHTML =
                        currentLang === 'es'
                            ? '¡Mensaje Enviado con Éxito! Me pondré en contacto pronto para discutir tu proyecto.'
                            : 'Message Sent Successfully! I will get back to you shortly.';
                } else {
                    throw new Error('Error en el envío');
                }
            } catch (err) {
                messageDiv.classList.remove('hidden');
                messageDiv.style.color = 'red';
                messageDiv.innerHTML =
                    currentLang === 'es'
                        ? '⚠️ Ocurrió un error. Intenta nuevamente.'
                        : '⚠️ An error occurred. Please try again.';
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML =
                    (currentLang === 'es' ? '¡Enviar Código!' : 'Send Code!') +
                    ' <i data-lucide="send" class="w-5 h-5 ml-2"></i>';
                lucide.createIcons();

                setTimeout(() => {
                    messageDiv.classList.add('hidden');
                }, 5000);
            }
        });
    }
});
