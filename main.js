
document.addEventListener('DOMContentLoaded', () => {

  function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.getElementById('main-nav');

    if (menuButton && mainNav) {
      menuButton.addEventListener('click', () => {
        // Apenas alterna a classe que controla a visibilidade e animação
        mainNav.classList.toggle('menu-aberto');

        const isExpanded = mainNav.classList.contains('menu-aberto');
        menuButton.setAttribute('aria-expanded', isExpanded);
      });
    }
  }

  function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '0px 0px 200px 0px' });
      lazyImages.forEach(img => observer.observe(img));
    } else {
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (typeof particlesJS !== 'undefined' && particlesContainer) {
      particlesJS('particles-js', {
        "particles": {
          "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#08d4a4" },
          "shape": { "type": "circle" },
          "opacity": { "value": 0.5, "random": true },
          "size": { "value": 3, "random": true },
          "line_linked": { "enable": true, "distance": 150, "color": "#30363d", "opacity": 0.4, "width": 1 },
          "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
          "modes": { "grab": { "distance": 140, "line_opacity": 1 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
      });
    }
  }

  function initFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

        document.querySelectorAll('.faq-answer').forEach(ans => {
          if (ans !== answer) {
            ans.style.maxHeight = '0px';
            ans.closest('.faq-item').querySelector('.faq-icon').textContent = '＋';
          }
        });

        if (isOpen) {
          answer.style.maxHeight = '0px';
          icon.textContent = '＋';
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.textContent = '－';
        }
      });
    });
  }

  // ===================================================================
  // INÍCIO DA FUNÇÃO DE CONTATO ATUALIZADA
  // ===================================================================
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const formStatusDiv = document.getElementById('form-status');

      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // ===================================================================
        // IMPORTANTE: Coloque o número de WhatsApp do seu negócio aqui!
        // Formato: 55 (código do país) + DDD + número (sem espaços ou traços)
        // Exemplo: 5511912345678
        const businessPhoneNumber = '5563981163822';
        // ===================================================================

        // Pega os valores dos novos campos do formulário
        const name = document.getElementById('contact-name').value.trim();
        const company = document.getElementById('contact-company').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();

        // Validação: verifica se os campos obrigatórios (nome e telefone) foram preenchidos
        if (name && phone) {
          // Cria a mensagem formatada que será enviada
          let message = `Olá! Gostaria de solicitar um contato.\n\n`;
          message += `*Nome:* ${name}\n`;

          // Adiciona a empresa apenas se o campo foi preenchido
          if (company) {
            message += `*Empresa:* ${company}\n`;
          }

          message += `*Telefone para Contato:* ${phone}`;

          // Codifica a mensagem para ser usada em uma URL
          const encodedMessage = encodeURIComponent(message);

          // Monta a URL final do WhatsApp
          const whatsappLink = `https://wa.me/${businessPhoneNumber}?text=${encodedMessage}`;

          // Abre o WhatsApp em uma nova aba
          window.open(whatsappLink, '_blank');

          // Exibe mensagem de sucesso
          formStatusDiv.textContent = "Tudo pronto! Finalize o envio no WhatsApp.";
          formStatusDiv.style.color = 'var(--color-accent)';
          formStatusDiv.classList.remove('hidden');

          // Limpa o formulário
          contactForm.reset();

        } else {
          // Exibe mensagem de erro se os campos não forem preenchidos
          formStatusDiv.textContent = "Por favor, preencha nome e telefone.";
          formStatusDiv.style.color = 'red';
          formStatusDiv.classList.remove('hidden');
        }
      });
    }
  }
  // ===================================================================
  // FIM DA FUNÇÃO DE CONTATO ATUALIZADA
  // ===================================================================

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('Service Worker registrado:', registration))
          .catch(error => console.log('Falha ao registrar SW:', error));
      });
    }
  }

  // --- CHAMADA DAS FUNÇÕES ---
  initMobileMenu();
  initLazyLoad();
  initParticles();
  initFaqAccordion();
  initContactForm();
  registerServiceWorker();

});