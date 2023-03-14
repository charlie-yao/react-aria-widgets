export const GOOGLE_ANALYTICS_ID = 'G-RVF86GJ24R';

export function pageView(url) {
  /* eslint-disable camelcase */
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
  /* eslint-enable camelcase */
}
