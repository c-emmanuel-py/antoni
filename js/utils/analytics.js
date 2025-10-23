/* ========================================
   ANALYTICS UTILITY
   ======================================== */

export class Analytics {
  constructor() {
    this.config = window.__ANALYTICS__ || {};
    this.isInitialized = false;
  }

  static init() {
    const analytics = new Analytics();
    analytics.initialize();
    return analytics;
  }

  initialize() {
    if (this.isInitialized) {
      return;
    }

    this.loadGoogleAnalytics();
    this.loadFacebookPixel();
    this.loadMicrosoftClarity();

    this.isInitialized = true;
    console.log('Analytics initialized');
  }

  loadGoogleAnalytics() {
    const measurementId = this.config.GA_MEASUREMENT_ID;
    if (!measurementId) {
      console.log('Google Analytics: No measurement ID provided');
      return;
    }

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href
    });

    console.log('Google Analytics loaded:', measurementId);
  }

  loadFacebookPixel() {
    const pixelId = this.config.PIXEL_ID;
    if (!pixelId) {
      console.log('Facebook Pixel: No pixel ID provided');
      return;
    }

    // Load Facebook Pixel script
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    console.log('Facebook Pixel loaded:', pixelId);
  }

  loadMicrosoftClarity() {
    const clarityId = this.config.CLARITY_ID;
    if (!clarityId) {
      console.log('Microsoft Clarity: No clarity ID provided');
      return;
    }

    // Load Microsoft Clarity script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${clarityId}");
    `;
    document.head.appendChild(script);

    console.log('Microsoft Clarity loaded:', clarityId);
  }

  /**
   * Track page view
   */
  trackPageView(pageName = null, pagePath = null) {
    const pageData = {
      page_title: pageName || document.title,
      page_location: pagePath || window.location.href,
      page_path: pagePath || window.location.pathname
    };

    // Google Analytics
    if (window.gtag) {
      window.gtag('config', this.config.GA_MEASUREMENT_ID, pageData);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    console.log('Page view tracked:', pageData);
  }

  /**
   * Track custom event
   */
  trackEvent(eventName, parameters = {}) {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }

    console.log('Event tracked:', eventName, parameters);
  }

  /**
   * Track conversion
   */
  trackConversion(conversionName, value = null, currency = 'USD') {
    const parameters = {
      event_category: 'conversion',
      event_label: conversionName
    };

    if (value !== null) {
      parameters.value = value;
      parameters.currency = currency;
    }

    this.trackEvent(conversionName, parameters);
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName, formData = {}) {
    this.trackEvent('form_submit', {
      event_category: 'form',
      event_label: formName,
      form_name: formName,
      ...formData
    });
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName, buttonLocation = 'unknown') {
    this.trackEvent('button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      button_name: buttonName,
      button_location: buttonLocation
    });
  }

  /**
   * Track link click
   */
  trackLinkClick(linkText, linkUrl, linkLocation = 'unknown') {
    this.trackEvent('link_click', {
      event_category: 'engagement',
      event_label: linkText,
      link_text: linkText,
      link_url: linkUrl,
      link_location: linkLocation
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth) {
    this.trackEvent('scroll', {
      event_category: 'engagement',
      event_label: 'scroll_depth',
      scroll_depth: depth
    });
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(timeInSeconds) {
    this.trackEvent('time_on_page', {
      event_category: 'engagement',
      event_label: 'time_on_page',
      time_on_page: timeInSeconds
    });
  }

  /**
   * Track search
   */
  trackSearch(searchTerm, resultsCount = null) {
    const parameters = {
      event_category: 'search',
      event_label: 'site_search',
      search_term: searchTerm
    };

    if (resultsCount !== null) {
      parameters.results_count = resultsCount;
    }

    this.trackEvent('search', parameters);
  }

  /**
   * Track video interaction
   */
  trackVideoInteraction(videoTitle, action, progress = null) {
    const parameters = {
      event_category: 'video',
      event_label: videoTitle,
      video_title: videoTitle,
      video_action: action
    };

    if (progress !== null) {
      parameters.video_progress = progress;
    }

    this.trackEvent('video_interaction', parameters);
  }

  /**
   * Track file download
   */
  trackFileDownload(fileName, fileType = 'unknown') {
    this.trackEvent('file_download', {
      event_category: 'download',
      event_label: fileName,
      file_name: fileName,
      file_type: fileType
    });
  }

  /**
   * Track social media interaction
   */
  trackSocialInteraction(platform, action, content = null) {
    const parameters = {
      event_category: 'social',
      event_label: platform,
      social_platform: platform,
      social_action: action
    };

    if (content) {
      parameters.social_content = content;
    }

    this.trackEvent('social_interaction', parameters);
  }

  /**
   * Track error
   */
  trackError(errorMessage, errorLocation = 'unknown') {
    this.trackEvent('error', {
      event_category: 'error',
      event_label: errorMessage,
      error_message: errorMessage,
      error_location: errorLocation
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties) {
    if (window.gtag) {
      window.gtag('config', this.config.GA_MEASUREMENT_ID, {
        custom_map: properties
      });
    }

    console.log('User properties set:', properties);
  }

  /**
   * Set user ID
   */
  setUserId(userId) {
    if (window.gtag) {
      window.gtag('config', this.config.GA_MEASUREMENT_ID, {
        user_id: userId
      });
    }

    console.log('User ID set:', userId);
  }

  /**
   * Enable/disable analytics
   */
  setEnabled(enabled) {
    if (enabled) {
      this.initialize();
    } else {
      this.disable();
    }
  }

  /**
   * Disable analytics
   */
  disable() {
    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('config', this.config.GA_MEASUREMENT_ID, {
        send_page_view: false
      });
    }

    // Disable Facebook Pixel
    if (window.fbq) {
      window.fbq('consent', 'revoke');
    }

    this.isInitialized = false;
    console.log('Analytics disabled');
  }

  /**
   * Get analytics configuration
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * Update analytics configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    console.log('Analytics config updated:', this.config);
  }
}
