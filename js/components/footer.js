/* ========================================
   FOOTER COMPONENT
   ======================================== */

export class Footer {
  constructor() {
    this.footer = document.querySelector('.footer');
    this.footerLinks = document.querySelectorAll('.footer-nav a');
    this.contactLinks = document.querySelectorAll('.footer-contact a');

    this.init();
  }

  init() {
    this.bindEvents();
    this.initAnimations();
  }

  bindEvents() {
    // Handle footer link clicks
    this.footerLinks.forEach(link => {
      link.addEventListener('click', e => this.handleLinkClick(e));
    });

    // Handle contact link clicks
    this.contactLinks.forEach(link => {
      link.addEventListener('click', e => this.handleContactLinkClick(e));
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', e => this.handleKeydown(e));
  }

  initAnimations() {
    if (!this.footer) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateFooterElements();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(this.footer);
  }

  animateFooterElements() {
    const elements = this.footer.querySelectorAll('.footer-section, .footer-bottom');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  handleLinkClick(e) {
    const href = e.currentTarget.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      this.scrollToSection(href.substring(1));
    }
  }

  handleContactLinkClick(e) {
    const href = e.currentTarget.getAttribute('href');

    // Track contact link clicks
    if (href.startsWith('tel:')) {
      this.trackEvent('contact', 'phone_click', href);
    } else if (href.startsWith('mailto:')) {
      this.trackEvent('contact', 'email_click', href);
    }
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  handleKeydown(e) {
    // Handle keyboard navigation for footer links
    if (e.key === 'Enter' || e.key === ' ') {
      const { target } = e;
      if (target.tagName === 'A' && target.closest('.footer')) {
        e.preventDefault();
        target.click();
      }
    }
  }

  trackEvent(category, action, label) {
    // Google Analytics tracking
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }

    // Facebook Pixel tracking
    if (window.fbq) {
      window.fbq('track', 'Contact', {
        content_category: category,
        content_name: action
      });
    }
  }

  /**
   * Update footer contact information
   */
  updateContactInfo(contactData) {
    const phoneLink = document.querySelector('.footer-contact a[href^="tel:"]');
    const emailLink = document.querySelector('.footer-contact a[href^="mailto:"]');
    const hoursElement = document.querySelector('.footer-contact p:last-child');

    if (phoneLink && contactData.phone) {
      phoneLink.href = `tel:${contactData.phone}`;
      phoneLink.textContent = contactData.phone;
    }

    if (emailLink && contactData.email) {
      emailLink.href = `mailto:${contactData.email}`;
      emailLink.textContent = contactData.email;
    }

    if (hoursElement && contactData.hours) {
      hoursElement.innerHTML = `<strong>Hours:</strong> ${contactData.hours}`;
    }
  }

  /**
   * Update footer address
   */
  updateAddress(addressData) {
    const addressElement = document.querySelector('.footer-address');
    if (!addressElement) {
      return;
    }

    const { line1, line2, line3 } = addressData;

    addressElement.innerHTML = `
      <p>${line1 || ''}</p>
      <p>${line2 || ''}</p>
      <p>${line3 || ''}</p>
    `;
  }

  /**
   * Add new footer link
   */
  addFooterLink(linkData) {
    const footerNav = document.querySelector('.footer-nav ul');
    if (!footerNav) {
      return;
    }

    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = linkData.href;
    a.textContent = linkData.text;
    a.addEventListener('click', e => this.handleLinkClick(e));

    li.appendChild(a);
    footerNav.appendChild(li);

    // Update footer links array
    this.footerLinks = document.querySelectorAll('.footer-nav a');
  }

  /**
   * Remove footer link
   */
  removeFooterLink(linkText) {
    const link = Array.from(this.footerLinks).find(link => link.textContent.trim() === linkText);

    if (link && link.parentElement) {
      link.parentElement.remove();
      this.footerLinks = document.querySelectorAll('.footer-nav a');
    }
  }

  /**
   * Update footer quote
   */
  updateQuote(quoteData) {
    const quoteElement = document.querySelector('.footer-quote');
    if (!quoteElement) {
      return;
    }

    const quoteText = quoteElement.querySelector('p');
    const quoteAuthor = quoteElement.querySelector('cite');

    if (quoteText && quoteData.text) {
      quoteText.textContent = quoteData.text;
    }

    if (quoteAuthor && quoteData.author) {
      quoteAuthor.textContent = quoteData.author;
    }
  }

  /**
   * Update copyright year
   */
  updateCopyrightYear() {
    const copyrightElement = document.querySelector('.footer-legal p');
    if (!copyrightElement) {
      return;
    }

    const currentYear = new Date().getFullYear();
    const text = copyrightElement.textContent;
    const updatedText = text.replace(/\d{4}/, currentYear);
    copyrightElement.textContent = updatedText;
  }

  /**
   * Get footer data
   */
  getFooterData() {
    const contactData = {
      phone: document.querySelector('.footer-contact a[href^="tel:"]')?.textContent,
      email: document.querySelector('.footer-contact a[href^="mailto:"]')?.textContent,
      hours: document.querySelector('.footer-contact p:last-child')?.textContent
    };

    const addressData = {
      line1: document.querySelector('.footer-address p:nth-child(1)')?.textContent,
      line2: document.querySelector('.footer-address p:nth-child(2)')?.textContent,
      line3: document.querySelector('.footer-address p:nth-child(3)')?.textContent
    };

    const quoteData = {
      text: document.querySelector('.footer-quote p')?.textContent,
      author: document.querySelector('.footer-quote cite')?.textContent
    };

    const linksData = Array.from(this.footerLinks).map(link => ({
      text: link.textContent.trim(),
      href: link.getAttribute('href')
    }));

    return {
      contact: contactData,
      address: addressData,
      quote: quoteData,
      links: linksData
    };
  }

  /**
   * Show/hide footer sections
   */
  toggleSection(sectionClass, show) {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      section.style.display = show ? 'block' : 'none';
    }
  }

  /**
   * Add footer animation
   */
  addAnimation(element, animationType = 'fade-up') {
    if (element) {
      element.setAttribute('data-animate', animationType);
    }
  }

  /**
   * Remove footer animation
   */
  removeAnimation(element) {
    if (element) {
      element.removeAttribute('data-animate');
    }
  }

  destroy() {
    // Remove event listeners
    this.footerLinks.forEach(link => {
      link.removeEventListener('click', this.handleLinkClick);
    });

    this.contactLinks.forEach(link => {
      link.removeEventListener('click', this.handleContactLinkClick);
    });

    document.removeEventListener('keydown', this.handleKeydown);

    // Reset styles
    const elements = this.footer?.querySelectorAll('.footer-section, .footer-bottom');
    elements?.forEach(element => {
      element.style.opacity = '';
      element.style.transform = '';
    });
  }
}
