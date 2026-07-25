document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle (Dark / Light Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check for saved theme preference, otherwise use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });


  // --- Mobile Navigation Menu ---
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });


  // --- Active Nav Link on Scroll (Scrollspy) ---
  const sections = document.querySelectorAll('section[id]');
  
  const scrollspy = () => {
    const scrollPosition = window.scrollY + 120; // offset for sticky header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollspy);
  scrollspy(); // Initial run


  // --- Product & Services Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button
      btn.classList.add('active');

      // Add active class to target tab content
      const targetTabId = btn.getAttribute('data-tab');
      const targetTab = document.getElementById(targetTabId);
      if (targetTab) {
        targetTab.classList.add('active');
      }
    });
  });


  // --- Legalitas Document Viewer & Accordion ---
  const legalItems = document.querySelectorAll('.legalitas-item');
  const docPanes = document.querySelectorAll('.doc-pane');

  legalItems.forEach(item => {
    item.addEventListener('click', () => {
      // Deactivate all accordion items and pane displays
      legalItems.forEach(i => i.classList.remove('active'));
      docPanes.forEach(p => p.classList.remove('active'));

      // Activate clicked item
      item.classList.add('active');

      // Activate corresponding document pane
      const targetDocId = item.getAttribute('data-doc');
      const targetPane = document.getElementById(targetDocId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });


  // --- Scroll Entrance Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // animate slightly before entering full view
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

});
