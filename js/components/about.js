/* ========================================
   ABOUT COMPONENT
   ======================================== */

export class About {
  constructor() {
    this.about = document.getElementById('about');
    this.aboutCards = document.querySelectorAll('.about-card');

    this.init();
  }

  init() {
    this.bindEvents();
    this.initAnimations();
  }

  bindEvents() {
    // Handle card interactions
    this.aboutCards.forEach(card => {
      card.addEventListener('mouseenter', () => this.handleCardHover(card));
      card.addEventListener('mouseleave', () => this.handleCardLeave(card));
      card.addEventListener('focus', () => this.handleCardFocus(card));
      card.addEventListener('blur', () => this.handleCardBlur(card));
    });

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());
  }

  initAnimations() {
    if (!this.about) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCards();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(this.about);
  }

  animateCards() {
    this.aboutCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, index * 150);
    });
  }

  handleCardHover(card) {
    // Add hover effects
    card.style.transform = 'translateY(-8px)';
    card.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
  }

  handleCardLeave(card) {
    // Remove hover effects
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '';
  }

  handleCardFocus(card) {
    // Add focus effects
    card.style.outline = '2px solid var(--accent)';
    card.style.outlineOffset = '4px';
  }

  handleCardBlur(card) {
    // Remove focus effects
    card.style.outline = '';
    card.style.outlineOffset = '';
  }

  handleResize() {
    // Reset any transform styles on resize
    this.aboutCards.forEach(card => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  }

  /**
   * Update card content dynamically
   */
  updateCardContent(cardIndex, newContent) {
    const card = this.aboutCards[cardIndex];
    if (!card) {
      return;
    }

    const title = card.querySelector('.card-title');
    const content = card.querySelector('.card-content');

    if (title && newContent.title) {
      title.textContent = newContent.title;
    }

    if (content && newContent.content) {
      content.textContent = newContent.content;
    }
  }

  /**
   * Add new card to the about section
   */
  addCard(cardData) {
    const cardsContainer = document.querySelector('.about-cards');
    if (!cardsContainer) {
      return;
    }

    const card = document.createElement('article');
    card.className = 'about-card';
    card.innerHTML = `
      <h3 class="card-title">${cardData.title}</h3>
      <p class="card-content">${cardData.content}</p>
    `;

    // Add event listeners
    card.addEventListener('mouseenter', () => this.handleCardHover(card));
    card.addEventListener('mouseleave', () => this.handleCardLeave(card));
    card.addEventListener('focus', () => this.handleCardFocus(card));
    card.addEventListener('blur', () => this.handleCardBlur(card));

    cardsContainer.appendChild(card);
    this.aboutCards = document.querySelectorAll('.about-card');
  }

  /**
   * Remove card from the about section
   */
  removeCard(cardIndex) {
    const card = this.aboutCards[cardIndex];
    if (!card) {
      return;
    }

    card.remove();
    this.aboutCards = document.querySelectorAll('.about-card');
  }

  /**
   * Get card data
   */
  getCardData(cardIndex) {
    const card = this.aboutCards[cardIndex];
    if (!card) {
      return null;
    }

    const title = card.querySelector('.card-title')?.textContent;
    const content = card.querySelector('.card-content')?.textContent;

    return { title, content };
  }

  /**
   * Update all cards with new data
   */
  updateAllCards(cardsData) {
    cardsData.forEach((cardData, index) => {
      this.updateCardContent(index, cardData);
    });
  }

  destroy() {
    // Remove event listeners
    this.aboutCards.forEach(card => {
      card.removeEventListener('mouseenter', this.handleCardHover);
      card.removeEventListener('mouseleave', this.handleCardLeave);
      card.removeEventListener('focus', this.handleCardFocus);
      card.removeEventListener('blur', this.handleCardBlur);
    });

    window.removeEventListener('resize', this.handleResize);

    // Reset styles
    this.aboutCards.forEach(card => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.outline = '';
      card.style.outlineOffset = '';
    });
  }
}
