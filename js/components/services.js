/* ========================================
   SERVICES COMPONENT
   ======================================== */

export class Services {
  constructor() {
    this.services = document.getElementById('services');
    this.serviceItems = document.querySelectorAll('.service-item');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.initAnimations();
  }

  bindEvents() {
    // Handle service item interactions
    this.serviceItems.forEach(item => {
      item.addEventListener('mouseenter', () => this.handleItemHover(item));
      item.addEventListener('mouseleave', () => this.handleItemLeave(item));
      item.addEventListener('focus', () => this.handleItemFocus(item));
      item.addEventListener('blur', () => this.handleItemBlur(item));
      item.addEventListener('click', () => this.handleItemClick(item));
    });

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());
  }

  initAnimations() {
    if (!this.services) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateItems();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(this.services);
  }

  animateItems() {
    this.serviceItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, index * 100);
    });
  }

  handleItemHover(item) {
    // Add hover effects
    item.style.transform = 'translateY(-4px)';
    item.style.backgroundColor = 'var(--bg-secondary)';
  }

  handleItemLeave(item) {
    // Remove hover effects
    item.style.transform = 'translateY(0)';
    item.style.backgroundColor = '';
  }

  handleItemFocus(item) {
    // Add focus effects
    item.style.outline = '2px solid var(--accent)';
    item.style.outlineOffset = '4px';
  }

  handleItemBlur(item) {
    // Remove focus effects
    item.style.outline = '';
    item.style.outlineOffset = '';
  }

  handleItemClick(item) {
    // Handle service item click
    const title = item.querySelector('.service-title')?.textContent;
    const description = item.querySelector('.service-description')?.textContent;
    
    // You can add custom logic here, like opening a modal or navigating to a detailed page
    console.log('Service clicked:', { title, description });
    
    // Add click animation
    item.style.transform = 'scale(0.98)';
    setTimeout(() => {
      item.style.transform = '';
    }, 150);
  }

  handleResize() {
    // Reset any transform styles on resize
    this.serviceItems.forEach(item => {
      item.style.transform = '';
      item.style.backgroundColor = '';
    });
  }

  /**
   * Update service item content
   */
  updateServiceItem(itemIndex, newContent) {
    const item = this.serviceItems[itemIndex];
    if (!item) return;

    const title = item.querySelector('.service-title');
    const description = item.querySelector('.service-description');

    if (title && newContent.title) {
      title.textContent = newContent.title;
    }

    if (description && newContent.description) {
      description.textContent = newContent.description;
    }
  }

  /**
   * Add new service item
   */
  addServiceItem(serviceData) {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    const item = document.createElement('div');
    item.className = 'service-item';
    item.innerHTML = `
      <h3 class="service-title">${serviceData.title}</h3>
      <p class="service-description">${serviceData.description}</p>
    `;

    // Add event listeners
    item.addEventListener('mouseenter', () => this.handleItemHover(item));
    item.addEventListener('mouseleave', () => this.handleItemLeave(item));
    item.addEventListener('focus', () => this.handleItemFocus(item));
    item.addEventListener('blur', () => this.handleItemBlur(item));
    item.addEventListener('click', () => this.handleItemClick(item));

    servicesGrid.appendChild(item);
    this.serviceItems = document.querySelectorAll('.service-item');
  }

  /**
   * Remove service item
   */
  removeServiceItem(itemIndex) {
    const item = this.serviceItems[itemIndex];
    if (!item) return;

    item.remove();
    this.serviceItems = document.querySelectorAll('.service-item');
  }

  /**
   * Get service item data
   */
  getServiceItemData(itemIndex) {
    const item = this.serviceItems[itemIndex];
    if (!item) return null;

    const title = item.querySelector('.service-title')?.textContent;
    const description = item.querySelector('.service-description')?.textContent;

    return { title, description };
  }

  /**
   * Update all service items
   */
  updateAllServiceItems(servicesData) {
    servicesData.forEach((serviceData, index) => {
      this.updateServiceItem(index, serviceData);
    });
  }

  /**
   * Filter services by keyword
   */
  filterServices(keyword) {
    this.serviceItems.forEach(item => {
      const title = item.querySelector('.service-title')?.textContent.toLowerCase();
      const description = item.querySelector('.service-description')?.textContent.toLowerCase();
      
      const matches = title?.includes(keyword.toLowerCase()) || 
                     description?.includes(keyword.toLowerCase());
      
      item.style.display = matches ? 'block' : 'none';
    });
  }

  /**
   * Show all services
   */
  showAllServices() {
    this.serviceItems.forEach(item => {
      item.style.display = 'block';
    });
  }

  destroy() {
    // Remove event listeners
    this.serviceItems.forEach(item => {
      item.removeEventListener('mouseenter', this.handleItemHover);
      item.removeEventListener('mouseleave', this.handleItemLeave);
      item.removeEventListener('focus', this.handleItemFocus);
      item.removeEventListener('blur', this.handleItemBlur);
      item.removeEventListener('click', this.handleItemClick);
    });

    window.removeEventListener('resize', this.handleResize);

    // Reset styles
    this.serviceItems.forEach(item => {
      item.style.transform = '';
      item.style.backgroundColor = '';
      item.style.outline = '';
      item.style.outlineOffset = '';
      item.style.display = '';
    });
  }
}
