'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Type declarations                                                  */
/* ------------------------------------------------------------------ */

interface ConsentData {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
  version?: string;
}

interface GtagConsentUpdate {
  analytics_storage?: 'granted' | 'denied';
  ad_storage?: 'granted' | 'denied';
  ad_user_data?: 'granted' | 'denied';
  ad_personalization?: 'granted' | 'denied';
  functionality_storage?: 'granted' | 'denied';
  security_storage?: 'granted' | 'denied';
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-XXXXXXXXXX';
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? '';

const CONSENT_KEY = 'cookie-consent';
const POLL_INTERVAL = 800;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentData;
  } catch {
    return null;
  }
}

function loadScript(
  src: string,
  id: string,
  attrs?: Record<string, string>,
): void {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
  }
  document.head.appendChild(script);
}

function pushConsent(update: GtagConsentUpdate): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_update',
    ...update,
  });
}

/* ------------------------------------------------------------------ */
/*  GA4 loader                                                         */
/* ------------------------------------------------------------------ */

let ga4Loaded = false;

function loadGA4(): void {
  if (ga4Loaded) return;
  ga4Loaded = true;

  // gtag.js
  loadScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    'ga4-script',
  );

  // Inline configuration
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  // Define gtag shim immediately
  if (typeof window.gtag !== 'function') {
    window.gtag = function (...args: unknown[]) {
      (window.dataLayer as unknown as unknown[]).push(args);
    };
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: true,
  });
}

function unloadGA4(): void {
  if (!ga4Loaded) return;
  const el = document.getElementById('ga4-script');
  if (el) el.remove();
  // Reset the flag so it can be re-loaded if consent is granted again
  ga4Loaded = false;
}

/* ------------------------------------------------------------------ */
/*  Facebook Pixel loader                                              */
/* ------------------------------------------------------------------ */

let fbPixelLoaded = false;

function loadFBPixel(): void {
  if (fbPixelLoaded || !FB_PIXEL_ID) return;
  fbPixelLoaded = true;

  // fbq initialization
  window._fbq = function (...args: unknown[]) {
    window.dataLayer = window.dataLayer || [];
    (window.dataLayer as unknown as unknown[]).push(args);
  };
  window.fbq = function (...args: unknown[]) {
    window._fbq(...args);
  };
  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');

  // fbevents.js
  loadScript('https://connect.facebook.net/en_US/fbevents.js', 'fb-pixel-script');
}

function unloadFBPixel(): void {
  if (!fbPixelLoaded) return;
  const el = document.getElementById('fb-pixel-script');
  if (el) el.remove();
  fbPixelLoaded = false;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Analytics() {
  const prevConsent = useRef<ConsentData | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const applyConsent = useCallback((consent: ConsentData | null) => {
    // Initialize dataLayer with default denied consent on first run
    if (!prevConsent.current && consent) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'default_consent',
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }

    // If consent exists, check what changed
    if (consent) {
      const prev = prevConsent.current;

      // Analytics consent
      if (consent.analytics && (!prev || !prev.analytics)) {
        pushConsent({ analytics_storage: 'granted' });
        loadGA4();
      } else if (!consent.analytics && prev?.analytics) {
        pushConsent({ analytics_storage: 'denied' });
        unloadGA4();
      }

      // Marketing consent (ad_storage + FB Pixel)
      if (consent.marketing && (!prev || !prev.marketing)) {
        pushConsent({ ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
        loadFBPixel();
      } else if (!consent.marketing && prev?.marketing) {
        pushConsent({ ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        unloadFBPixel();
      }
    }

    prevConsent.current = consent ? { ...consent } : null;
  }, []);

  useEffect(() => {
    // Apply consent immediately on mount
    applyConsent(getConsent());

    // Poll for consent changes (CookieConsent writes to localStorage)
    timerRef.current = setInterval(() => {
      const current = getConsent();
      const prev = prevConsent.current;

      // Check if analytics or marketing flags changed
      if (
        current?.analytics !== prev?.analytics ||
        current?.marketing !== prev?.marketing
      ) {
        applyConsent(current);
      }
    }, POLL_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [applyConsent]);

  // This component renders nothing visible
  return null;
}
