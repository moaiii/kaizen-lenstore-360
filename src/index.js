import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { hydrate, render } from 'react-dom';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import WebFont from 'webfontloader';
import ReactGA from 'react-ga';
import styled, { ThemeProvider } from 'styled-components';
import store from './redux';
import Header from './components/Header';
import Footer from './components/Footer';
import copy from './assets/copy.json';
import Root from './components/Root';
import './styles.scss';
import './assets/index.css';

WebFont.load({ google: { families: ['Lato:400,700'] } });

const theme = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    lightGrey: '#F9F9F9',
    grey: '#D8D8D8',
    darkGrey: '#707070',
  },
  sizes: {
    mTablet: '768px',
    mPhablet: '650px',
    mPhone: '500px',
    mSmall: '400px',
  },
};
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
`;
const Body = styled.div``;

const App = () => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    ReactGA.initialize(copy.ga, { gaOptions: { allowLinker: true } });
    ReactGA.set({ anonymizeIp: true });
    ReactGA.pageview(location.pathname);
    if (navigator.userAgent !== 'ReactSnap') {
      setIsDesktop(window.innerWidth > 768);
    }
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <html lang={copy.lang} />
        <title>{`${copy.title} | Lenstore`}</title>
        <meta name="description" content={copy.description} />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:url" content={copy.url} />
        <meta property="og:locale" content={copy.ogLocale} />
        <meta property="og:image" content={`${copy.url}/opengraph.png`} />
        <meta
          property="og:image:secure_url"
          content={`${copy.url}/opengraph.png`}
        />
        <meta name="twitter:image" content={`${copy.url}/opengraph.png`} />
        <meta name="twitter:site" content={`@${copy.twitter}`} />
        <meta name="twitter:title" content={copy.title} />
        <meta name="twitter:description" content={copy.description} />
        <meta name="twitter:url" content={copy.url} />
        <link rel="canonical" href={copy.url} />
        {Object.keys(copy.baseUrl).map((key) => (
          <link
            key={key}
            rel="alternate"
            hrefLang={key}
            href={copy.baseUrl[key]}
          />
        ))}
      </Helmet>
      <ThemeProvider theme={theme}>
        <Header copy={copy} isDesktop={isDesktop} />
        <Body>
          <Provider store={store}>
            <Root />
          </Provider>
        </Body>
        <Footer copy={copy} />
      </ThemeProvider>
    </Wrapper>
  );
};

const rootElement = document.getElementById('360EyeConditions');
const baseName = new URL(copy.url).pathname;

render(
  <React.StrictMode>
    <Router basename={baseName}>
      <App />
    </Router>
  </React.StrictMode>,
  rootElement,
);
