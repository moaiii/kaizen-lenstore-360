/* eslint-disable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
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

const getLang = () => {
  if (process.env.REACT_APP_BUILD === 'dev') {
    const allowedLangs = ['en', 'es', 'de', 'it'];
    const [, lang] = window.location.search.split('=');
    if (allowedLangs.includes(lang)) {
      return lang;
    }
  }

  return process.env.REACT_APP_LANG;
};

const lang = getLang();

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

window.addEventListener('orientationchange', () => {
  if (window.innerHeight > window.innerWidth) {
    setTimeout(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 500);
  }
});

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
        <title>{`${copy.title[lang]} | Lenstore`}</title>
        <meta name="description" content={copy.description[lang]} />
        <meta property="og:title" content={copy['meta-title'][lang]} />
        <meta property="og:description" content={copy.description[lang]} />
        <meta property="og:url" content={copy.url} />
        <meta property="og:locale" content={copy.ogLocale[lang]} />
        <meta property="og:image" content={copy['ogImage'][lang]} />
        <meta property="og:image:secure_url" content={copy['ogImage'][lang]} />
        <meta name="twitter:image" content={copy['ogImage'][lang]} />
        <meta name="twitter:site" content={`@${copy.twitter}`} />
        <meta name="twitter:title" content={copy['meta-title'][lang]} />
        <meta name="twitter:description" content={copy.description[lang]} />
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
        {window.mobileCheck() === false && (
          <Header copy={copy} isDesktop={isDesktop} lang={lang} />
        )}
        <Body>
          <Provider store={store}>
            <Root copy={copy} lang={lang} />
          </Provider>
        </Body>
        <Footer copy={copy} lang={lang} />
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
