/**
 * Analytics utility for tracking page views and events
 * Supports Google Analytics 4, Meta Pixel, and other platforms
 */

// Declare global window interfaces for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  metaPixelId?: string;
  // Add more analytics platforms as needed
}

class Analytics {
  private config: AnalyticsConfig = {};
  private initialized = false;

  /**
   * Initialize analytics with configuration
   */
  init(config: AnalyticsConfig) {
    this.config = config;

    // Initialize Google Analytics
    if (config.googleAnalyticsId) {
      this.initGoogleAnalytics(config.googleAnalyticsId);
    }

    // Initialize Meta Pixel
    if (config.metaPixelId) {
      this.initMetaPixel(config.metaPixelId);
    }

    this.initialized = true;
  }

  /**
   * Initialize Google Analytics 4
   */
  private initGoogleAnalytics(measurementId: string) {
    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false, // We'll manually track page views
    });
  }

  /**
   * Initialize Meta Pixel (Facebook Pixel)
   */
  private initMetaPixel(pixelId: string) {
    // Load Meta Pixel script
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
    `;
    document.head.appendChild(script);

    // Add noscript pixel
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }

  /**
   * Track a page view
   */
  pageView(path: string, title?: string) {
    if (!this.initialized) return;

    // Google Analytics
    if (this.config.googleAnalyticsId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
      });
    }

    // Meta Pixel
    if (this.config.metaPixelId && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }

  /**
   * Track a custom event
   */
  event(eventName: string, parameters?: Record<string, any>) {
    if (!this.initialized) return;

    // Google Analytics
    if (this.config.googleAnalyticsId && window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Meta Pixel
    if (this.config.metaPixelId && window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
    }
  }

  /**
   * Track form submission
   */
  formSubmit(formName: string, parameters?: Record<string, any>) {
    this.event('form_submit', {
      form_name: formName,
      ...parameters,
    });
  }

  /**
   * Track button click
   */
  buttonClick(buttonName: string, parameters?: Record<string, any>) {
    this.event('button_click', {
      button_name: buttonName,
      ...parameters,
    });
  }

  /**
   * Track outbound link
   */
  outboundLink(url: string, parameters?: Record<string, any>) {
    this.event('outbound_link', {
      link_url: url,
      ...parameters,
    });
  }

  /**
   * Track conversion/lead
   */
  lead(parameters?: Record<string, any>) {
    if (!this.initialized) return;

    // Google Analytics
    if (this.config.googleAnalyticsId && window.gtag) {
      window.gtag('event', 'generate_lead', parameters);
    }

    // Meta Pixel
    if (this.config.metaPixelId && window.fbq) {
      window.fbq('track', 'Lead', parameters);
    }
  }
}

// Export singleton instance
export const analytics = new Analytics();
