/* ========================================
   PROJECTS COMPONENT
   ======================================== */

export class Projects {
  constructor() {
    this.projects = document.getElementById('projects');
    this.projectCards = document.querySelectorAll('.project-card');
    this.learnMoreButtons = document.querySelectorAll('.project-learn-more');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modal = document.querySelector('.modal');
    this.modalClose = document.querySelector('.modal-close');
    this.modalImage = document.getElementById('modalImage');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalLocation = document.getElementById('modalLocation');
    this.modalDescription = document.getElementById('modalDescription');
    
    this.isModalOpen = false;
    this.currentProject = null;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.initAnimations();
    this.initModal();
  }

  bindEvents() {
    // Handle learn more button clicks
    this.learnMoreButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleLearnMoreClick(e));
    });

    // Handle modal close
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }

    // Handle modal overlay click
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeModal();
        }
      });
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());
  }

  initAnimations() {
    if (!this.projects) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCards();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(this.projects);
  }

  animateCards() {
    this.projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, index * 150);
    });
  }

  initModal() {
    // Set up modal accessibility
    if (this.modal) {
      this.modal.setAttribute('role', 'dialog');
      this.modal.setAttribute('aria-modal', 'true');
    }
  }

  handleLearnMoreClick(e) {
    e.preventDefault();
    const button = e.currentTarget;
    const projectId = button.getAttribute('data-modal');
    
    if (projectId) {
      this.openModal(projectId);
    }
  }

  openModal(projectId) {
    const projectData = this.getProjectData(projectId);
    if (!projectData) return;

    this.currentProject = projectData;
    this.isModalOpen = true;

    // Update modal content
    if (this.modalImage) {
      this.modalImage.src = projectData.image;
      this.modalImage.alt = projectData.imageAlt;
    }

    if (this.modalTitle) {
      this.modalTitle.textContent = projectData.title;
    }

    if (this.modalLocation) {
      this.modalLocation.textContent = projectData.location;
    }

    if (this.modalDescription) {
      this.modalDescription.innerHTML = projectData.description;
    }

    // Show modal
    if (this.modalOverlay) {
      this.modalOverlay.classList.add('active');
      this.modalOverlay.setAttribute('aria-hidden', 'false');
    }

    // Focus management
    this.trapFocus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Announce to screen readers
    this.announceModalOpen(projectData.title);
  }

  closeModal() {
    if (!this.isModalOpen) return;

    this.isModalOpen = false;
    this.currentProject = null;

    // Hide modal
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('active');
      this.modalOverlay.setAttribute('aria-hidden', 'true');
    }

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to trigger button
    const activeButton = document.querySelector('.project-learn-more[data-modal]:focus');
    if (activeButton) {
      activeButton.focus();
    }
  }

  handleKeydown(e) {
    if (!this.isModalOpen) return;

    // Close modal on Escape
    if (e.key === 'Escape') {
      this.closeModal();
    }

    // Trap focus within modal
    if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }

  handleTabKey(e) {
    if (!this.modal) return;

    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  trapFocus() {
    if (!this.modal) return;

    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    if (firstElement) {
      firstElement.focus();
    }
  }

  announceModalOpen(title) {
    // Create announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Modal opened: ${title}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  getProjectData(projectId) {
    const projectData = {
      'romana-condos': {
        title: 'Romana Condos',
        location: 'La Romana, Dominican Republic',
        image: '/img/condominio.png',
        imageAlt: 'Romana Condos - Modern residential complex with ocean views',
        description: `
          <p>Luxury residential complex featuring modern amenities and stunning ocean views. This project showcases our expertise in high-end residential development with a focus on sustainable design and premium finishes.</p>
          <ul>
            <li>50 luxury condominiums</li>
            <li>Oceanfront location with private beach access</li>
            <li>Modern amenities including pool, gym, and concierge services</li>
            <li>Sustainable design with energy-efficient systems</li>
            <li>Premium finishes and smart home technology</li>
          </ul>
        `
      },
      'mountain-bungalows': {
        title: 'Mountain Bungalows',
        location: 'San José de Ocoa, Dominican Republic',
        image: '/img/patioOP.png',
        imageAlt: 'Mountain Bungalows - Sustainable mountain retreat with panoramic views',
        description: `
          <p>Eco-friendly mountain retreat designed for sustainable living and relaxation. This project demonstrates our commitment to environmental responsibility while creating beautiful, functional spaces.</p>
          <ul>
            <li>12 sustainable bungalows</li>
            <li>Panoramic mountain views</li>
            <li>Solar power and rainwater collection systems</li>
            <li>Natural materials and local craftsmanship</li>
            <li>Minimal environmental impact design</li>
          </ul>
        `
      },
      'antoni-village': {
        title: 'Antoni Village',
        location: 'La Romana, Dominican Republic',
        image: '/img/villa.png',
        imageAlt: 'Antoni Village - Exclusive residential community with luxury amenities',
        description: `
          <p>Exclusive residential community featuring luxury villas and world-class amenities. This master-planned development represents the pinnacle of luxury living in the Dominican Republic.</p>
          <ul>
            <li>25 luxury villas</li>
            <li>Golf course and country club</li>
            <li>Private marina and beach club</li>
            <li>24/7 security and concierge services</li>
            <li>Custom design options for each villa</li>
          </ul>
        `
      },
      'private-residence': {
        title: 'Private Residence',
        location: 'San José de Ocoa, Dominican Republic',
        image: '/img/patio.png',
        imageAlt: 'Private Residence - Custom luxury home with contemporary design',
        description: `
          <p>Custom luxury residence showcasing contemporary design and premium finishes. This private home represents our ability to create unique, personalized spaces that reflect our clients' vision.</p>
          <ul>
            <li>Custom architectural design</li>
            <li>Premium materials and finishes</li>
            <li>Smart home automation</li>
            <li>Landscaped gardens and outdoor living spaces</li>
            <li>Energy-efficient and sustainable features</li>
          </ul>
        `
      }
    };

    return projectData[projectId] || null;
  }

  handleResize() {
    // Reset any transform styles on resize
    this.projectCards.forEach(card => {
      card.style.transform = '';
    });
  }

  /**
   * Update project card content
   */
  updateProjectCard(cardIndex, newContent) {
    const card = this.projectCards[cardIndex];
    if (!card) return;

    const title = card.querySelector('.project-title');
    const location = card.querySelector('.project-location');
    const description = card.querySelector('.project-description');

    if (title && newContent.title) {
      title.textContent = newContent.title;
    }

    if (location && newContent.location) {
      location.textContent = newContent.location;
    }

    if (description && newContent.description) {
      description.textContent = newContent.description;
    }
  }

  /**
   * Add new project card
   */
  addProjectCard(projectData) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-image">
        <img src="${projectData.image}" alt="${projectData.imageAlt}" loading="lazy" width="400" height="300">
      </div>
      <div class="project-content">
        <h3 class="project-title">${projectData.title}</h3>
        <p class="project-location">${projectData.location}</p>
        <p class="project-description">${projectData.description}</p>
        <button class="btn btn-outline project-learn-more" data-modal="${projectData.id}">Learn more →</button>
      </div>
    `;

    // Add event listener for learn more button
    const learnMoreBtn = card.querySelector('.project-learn-more');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', (e) => this.handleLearnMoreClick(e));
    }

    projectsGrid.appendChild(card);
    this.projectCards = document.querySelectorAll('.project-card');
    this.learnMoreButtons = document.querySelectorAll('.project-learn-more');
  }

  destroy() {
    // Remove event listeners
    this.learnMoreButtons.forEach(button => {
      button.removeEventListener('click', this.handleLearnMoreClick);
    });

    if (this.modalClose) {
      this.modalClose.removeEventListener('click', this.closeModal);
    }

    if (this.modalOverlay) {
      this.modalOverlay.removeEventListener('click', this.closeModal);
    }

    document.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.handleResize);

    // Close modal if open
    if (this.isModalOpen) {
      this.closeModal();
    }

    // Reset styles
    this.projectCards.forEach(card => {
      card.style.transform = '';
    });
  }
}