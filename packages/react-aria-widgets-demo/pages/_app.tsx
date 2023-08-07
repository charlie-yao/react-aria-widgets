/* eslint-disable react/jsx-props-no-spreading */

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

//Components
import Layout from '../components/Layout';

//Styles
import '../styles/styles.scss';

//Contexts
import NavContext from '../context/NavContext';

//Misc.
import { GOOGLE_ANALYTICS_ID, pageView } from '../utils/googleAnalytics';

//Types
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement } from 'react';

export type NextPageWithSubNav<P = {}, IP = P> = NextPage<P, IP> & {
  SubNav?: ReactElement;
}

export type AppPropsWithSubNav = AppProps & {
  Component: NextPageWithSubNav;
}

const GOOGLE_ANALYTICS_TAG
= `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GOOGLE_ANALYTICS_ID}');
`;

export default function App({ Component, pageProps }: AppPropsWithSubNav) {
  const [ isNavExpanded, setNavExpanded ] = useState(false);
  const router = useRouter();

  const navContextValue = useMemo(() => {
    return {
      isNavExpanded,
      setNavExpanded,
    };
  }, [ isNavExpanded, setNavExpanded ]);

  useEffect(() => {
    function handleRouteChange(url: string) {
      pageView(url);
      setNavExpanded(false);
    }

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [ router.events ]);

  return (
    <>
      <Head>
        <title>React ARIA Widgets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={ `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}` }
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: GOOGLE_ANALYTICS_TAG }}
      />
      <NavContext.Provider value={ navContextValue }>
        <Layout SubNav={ Component.SubNav }>
          <Component { ...pageProps } />
        </Layout>
      </NavContext.Provider>
      <Script src="https://kit.fontawesome.com/60e1a84dd0.js" crossOrigin="anonymous" />
    </>
  );
}
