/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
// import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/android-chrome-36x36.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-48x48.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-72x72.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-96x96.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-144x144.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-192x192.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-256x256.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-384x384.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-512x512.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
import '!file-loader?name=[name].[ext]!./utils/jquery.js';
import '!file-loader?name=[name].[ext]!./utils/jquery-1.12.3.min.js';
import '!file-loader?name=[name].[ext]!./utils/style.js';
import '!file-loader?name=[name].[ext]!./utils/jquery-ui.1.9.2.min.js';
import '!file-loader?name=[name].[ext]!./utils/plugins/swiper.js';
import '!file-loader?name=[name].[ext]!./utils/plugins/autosize.min.js';
import '!file-loader?name=[name].[ext]!./utils/clipboard.min.js';


import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Thin.eot'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Thin.otf'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Thin.woff'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Thin.woff2'


import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Light.eot'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Light.otf'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Light.woff'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Light.woff2'


import '!file-loader?name=[name].[ext]!./fonts/NotoSans-DemiLight.eot'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-DemiLight.otf'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-DemiLight.woff'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-DemiLight.woff2'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Regular.eot'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Regular.otf'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Regular.woff'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Regular.woff2'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Medium.eot'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Medium.otf'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Medium.woff'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Medium.woff2'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Black.eot'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Black.otf'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Black.woff'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Black.woff2'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Bold.eot'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Bold.otf'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Bold.woff'
import '!file-loader?name=[name].[ext]!./fonts/NotoSans-Bold.woff2'


import '!file-loader?name=[name].[ext]!./css/quiz.css';
import '!file-loader?name=[name].[ext]!./css/reset.css';
import '!file-loader?name=[name].[ext]!./css/styles.css';
import '!file-loader?name=[name].[ext]!./css/wallet.css';
import '!file-loader?name=[name].[ext]!./css/fonts.css';

import '!file-loader?name=[name].[ext]!./images/icon-bar-bot.png';
import '!file-loader?name=[name].[ext]!./images/icon_point.png';
import '!file-loader?name=[name].[ext]!./images/icon_search.png';
import '!file-loader?name=[name].[ext]!./images/icon_setting.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-bot-on.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-nsec.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-nsec-on.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-channel.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-channel-on.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-chat.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-chat-on.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-friend.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-friend-on.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-point.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-point-on.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-quiz.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-quiz-on.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-event.png';
import '!file-loader?name=[name].[ext]!./images/icon-bar-event-on.png';

import '!file-loader?name=[name].[ext]!./images/wallet/q_icon.png';
import '!file-loader?name=[name].[ext]!./images/wallet/eth_icon.png';
import '!file-loader?name=[name].[ext]!./images/wallet/lock_icon.png';
import '!file-loader?name=[name].[ext]!./images/wallet/wallet_icon.png';
import '!file-loader?name=[name].[ext]!./images/wallet/re_icon.png';
import '!file-loader?name=[name].[ext]!./images/wallet/link_icon.png';

import '!file-loader?name=[name].[ext]!./images/wallet/w_qricon.png';

import '!file-loader?name=[name].[ext]!./images/wallet/w_close.png';


import '!file-loader?name=[name]!./vendor/github/CNAME'; // for github - domain connection
/* eslint-enable import/no-unresolved, import/extensions */

// token icons
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/bat.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/bnb.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/bnt.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/dgd.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/eos.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/eth.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/ethos.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/fun.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/gnt.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/icx.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/knc.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/mkr.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/mero.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/omg.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/qash.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/qsp.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/qtum.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/rdn.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/rep.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/req.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/rtt.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/snt.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/salt.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/symb.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/trx.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/zrx.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/JUNLAB.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/MPC.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/MPCOIN.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/GLC.png';
import '!file-loader?name=token-icons/[name].[ext]!./images/token-icons/Qtcon.png';

import configureStore from './store';

// Will be added in the future
// Import i18n messages
// import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles2';

// Create redux store with history
const initialState = {};
const history = createHistory();
export const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = (messages) => { // eslint-disable-line
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  /* module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  }); */
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
/*
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
} */
render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
