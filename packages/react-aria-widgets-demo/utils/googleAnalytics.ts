export const GOOGLE_ANALYTICS_ID = 'G-RVF86GJ24R';

export function pageView(url: string) {
  /* eslint-disable camelcase */
  if(typeof window.gtag !== 'function')
    return;

  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
  /* eslint-enable camelcase */
}
