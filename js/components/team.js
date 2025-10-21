/* ========================================
   TEAM COMPONENT
   ======================================== */

export class Team {
  constructor() {
    this.team = document.getElementById('team');
    this.carouselContainer = document.querySelector('.team-carousel-container');
    this.carousel = document.querySelector('.team-carousel');
    this.carouselSlide = document.querySelector('.carousel-slide');
    this.teamMembers = document.querySelectorAll('.team-member');
    this.prevButton = document.querySelector('.carousel-nav.prev');
    this.nextButton = document.querySelector('.carousel-nav.next');

    this.currentIndex = 0;
    this.isAnimating = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    this.totalMembers = this.teamMembers.length;
    this.membersPerSlide = 3; // Show 3 members per slide

    this.init();
  }

  init() {
    this.bindEvents();
    this.initAnimations();
    // No need for manual slider initialization with infinite scroll
  }

  bindEvents() {
    // Pause auto-play on hover
    if (this.carouselContainer) {
      this.carouselContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
      this.carouselContainer.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }
  }

  initSlider() {
    if (!this.carouselSlide || this.totalMembers === 0) return;

    // Create multiple slides if needed
    this.createSlides();

    // Set initial position
    this.updateCarousel();
  }

  createSlides() {
    // Since we already have all members in one slide, we need to split them
    if (this.totalMembers <= this.membersPerSlide) {
      this.totalSlides = 1;
      return;
    }

    // Calculate number of slides needed
    this.totalSlides = Math.ceil(this.totalMembers / this.membersPerSlide);

    // Create additional slides if needed
    if (this.totalSlides > 1) {
      // Clear existing slides
      this.carousel.innerHTML = '';

      // Create slides
      for (let slideIndex = 0; slideIndex < this.totalSlides; slideIndex++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        // Add members to this slide
        const startIndex = slideIndex * this.membersPerSlide;
        const endIndex = Math.min(startIndex + this.membersPerSlide, this.totalMembers);

        for (let memberIndex = startIndex; memberIndex < endIndex; memberIndex++) {
          const member = this.teamMembers[memberIndex];
          if (member) {
            slide.appendChild(member.cloneNode(true));
          }
        }

        this.carousel.appendChild(slide);
      }

      // Update references
      this.carouselSlides = document.querySelectorAll('.carousel-slide');
    }
  }

  createDots() {
    if (!this.sliderDots || this.totalSlides <= 1) return;

    this.sliderDots.innerHTML = '';

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.sliderDots.appendChild(dot);
    }

    this.updateDots();
  }

  initTouchEvents() {
    if (!this.carousel) return;

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      this.pauseAutoPlay();
    });

    this.carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
      }
    });

    this.carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;

      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const threshold = 50;

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }

      isDragging = false;
      this.resumeAutoPlay();
    });

    // Mouse events for desktop
    let mouseStartX = 0;
    let isMouseDragging = false;

    this.carousel.addEventListener('mousedown', (e) => {
      mouseStartX = e.clientX;
      isMouseDragging = true;
      this.pauseAutoPlay();
      e.preventDefault();
    });

    this.carousel.addEventListener('mousemove', (e) => {
      if (!isMouseDragging) return;
      e.preventDefault();
    });

    this.carousel.addEventListener('mouseup', (e) => {
      if (!isMouseDragging) return;

      const mouseEndX = e.clientX;
      const diffX = mouseStartX - mouseEndX;
      const threshold = 50;

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }

      isMouseDragging = false;
      this.resumeAutoPlay();
    });

    this.carousel.addEventListener('mouseleave', () => {
      isMouseDragging = false;
      this.resumeAutoPlay();
    });
  }

  initAnimations() {
    if (!this.team) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateTeamMembers();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(this.team);
  }

  animateTeamMembers() {
    const teamMembers = this.team.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
      setTimeout(() => {
        member.classList.add('animate');
      }, index * 100);
    });
  }

  nextSlide() {
    if (this.isAnimating) return;

    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }

  previousSlide() {
    if (this.isAnimating) return;

    this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
    this.updateCarousel();
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;

    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    if (!this.carousel) return;

    this.isAnimating = true;

    const translateX = -(this.currentIndex * 100);
    this.carousel.style.transform = `translateX(${translateX}%)`;

    // Update button states
    this.updateButtonStates();

    // Reset animation flag
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  updateDots() {
    if (!this.sliderDots) return;

    const dots = this.sliderDots.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  updateButtonStates() {
    if (this.prevButton) {
      this.prevButton.disabled = this.currentIndex === 0;
      this.prevButton.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
    }

    if (this.nextButton) {
      this.nextButton.disabled = this.currentIndex === this.totalSlides - 1;
      this.nextButton.style.opacity = this.currentIndex === this.totalSlides - 1 ? '0.5' : '1';
    }
  }

  startAutoPlay() {
    if (this.totalSlides <= 1) return;

    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.carousel) {
      this.carousel.style.animationPlayState = 'paused';
    }
  }

  resumeAutoPlay() {
    if (this.carousel) {
      this.carousel.style.animationPlayState = 'running';
    }
  }

  handleKeydown(e) {
    if (e.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (e.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  handleResize() {
    // Reset carousel position on resize
    this.updateCarousel();
  }

  /**
   * Update team member content
   */
  updateTeamMember(memberIndex, newContent) {
    const members = document.querySelectorAll('.team-member');
    const member = members[memberIndex];
    if (!member) return;

    const name = member.querySelector('.member-name');
    const role = member.querySelector('.member-role');
    const bio = member.querySelector('.member-bio');

    if (name && newContent.name) {
      name.textContent = newContent.name;
    }

    if (role && newContent.role) {
      role.textContent = newContent.role;
    }

    if (bio && newContent.bio) {
      bio.textContent = newContent.bio;
    }
  }

  /**
   * Add new team member to slider
   */
  addTeamMember(memberData) {
    if (!this.sliderTrack) return;

    const slide = document.createElement('div');
    slide.className = 'slider-slide';
    slide.innerHTML = `
      <div class="team-member">
        <div class="member-photo">
          <img src="${memberData.image}" alt="${memberData.imageAlt}" loading="lazy" width="150" height="150">
        </div>
        <h4 class="member-name">${memberData.name}</h4>
        <p class="member-role">${memberData.role}</p>
        <p class="member-bio">${memberData.bio}</p>
      </div>
    `;

    this.sliderTrack.appendChild(slide);
    this.sliderSlides = document.querySelectorAll('.slider-slide');
    this.totalSlides = this.sliderSlides.length;

    // Recreate dots
    this.createDots();
  }

  /**
   * Remove team member from slider
   */
  removeTeamMember(memberIndex) {
    const slide = this.sliderSlides[memberIndex];
    if (!slide) return;

    slide.remove();
    this.sliderSlides = document.querySelectorAll('.slider-slide');
    this.totalSlides = this.sliderSlides.length;

    // Adjust current index if necessary
    if (this.currentIndex >= this.totalSlides) {
      this.currentIndex = this.totalSlides - 1;
    }

    // Recreate dots
    this.createDots();
    this.updateSlider();
  }

  /**
   * Get current slide data
   */
  getCurrentSlideData() {
    const currentSlide = this.sliderSlides[this.currentIndex];
    if (!currentSlide) return null;

    const member = currentSlide.querySelector('.team-member');
    if (!member) return null;

    const name = member.querySelector('.member-name')?.textContent;
    const role = member.querySelector('.member-role')?.textContent;
    const bio = member.querySelector('.member-bio')?.textContent;

    return { name, role, bio };
  }

  destroy() {
    // Remove event listeners
    if (this.prevButton) {
      this.prevButton.removeEventListener('click', this.previousSlide);
    }

    if (this.nextButton) {
      this.nextButton.removeEventListener('click', this.nextSlide);
    }

    if (this.carouselContainer) {
      this.carouselContainer.removeEventListener('mouseenter', this.pauseAutoPlay);
      this.carouselContainer.removeEventListener('mouseleave', this.resumeAutoPlay);
    }

    document.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.handleResize);

    // Stop auto-play
    this.pauseAutoPlay();

    // Reset styles
    if (this.carousel) {
      this.carousel.style.transform = '';
    }
  }
}
