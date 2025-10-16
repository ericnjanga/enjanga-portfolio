/**
 * Google Analytics tracker
 * ------------------------
 * Handles GA4 integration for client-side events and page views.
 * 
 * Exports:
 * - GA_MEASUREMENT_ID → environment-based measurement ID
 * - pageview(url) → logs a page view
 * - event({...}) → logs a custom event with category, label, and value
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Extend the global Window interface so TypeScript recognizes gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}


// Log page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
