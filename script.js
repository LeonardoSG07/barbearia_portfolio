/**
 * Valhalla Barber Club - Funcionalidades Interativas
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('menuToggle');

  /* --------------------------------------------------------------------------
   * 1. Efeito de Scroll no Header
   * -------------------------------------------------------------------------- */
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --------------------------------------------------------------------------
   * 2. Controle do Menu Hambúrguer (Mobile)
   * -------------------------------------------------------------------------- */
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => {
    setMenu(!nav.classList.contains('open'));
  });

  // Fechar menu ao clicar em qualquer link de navegação
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Fechar menu ao pressionar a tecla ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  // Fechar menu se a janela for redimensionada para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
  });

  /* --------------------------------------------------------------------------
   * 3. Animação de Surgimento de Elementos (IntersectionObserver)
   * -------------------------------------------------------------------------- */
  const observerOptions = {
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});