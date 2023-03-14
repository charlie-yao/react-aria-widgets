/* eslint-disable react/jsx-props-no-spreading */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

//Components
import Layout from '../components/Layout';

//Styles
import '../styles/styles.scss';

//Misc.
import { GOOGLE_ANALYTICS_ID, pageView } from '../utils/googleAnalytics';

const GOOGLE_ANALYTICS_TAG
= `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GOOGLE_ANALYTICS_ID}');
`;

function App(props) {
  const { Component, pageProps } = props;
  const [ isNavExpanded, setNavExpanded ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleRouteChange(url) {
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
      <Layout
        isNavExpanded={ isNavExpanded }
        setNavExpanded={ setNavExpanded }
        SubNav={ Component.SubNav }
      >
        <Component { ...pageProps } />
      </Layout>
      <Script src="https://kit.fontawesome.com/60e1a84dd0.js" crossorigin="anonymous" />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
