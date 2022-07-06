import { Suspense, useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import "./App.css";
import "./assets/scss/custom.scss";
import View from "./views";

import TimeAgo from "javascript-time-ago";
import AppContextProvider from "./context/AppContext";
import UserContextProvider from "./context/UserContext";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { provider } from "web3-core";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import CookieConsent from "./components/cookieconsent";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function getLibrary(provider: provider) {
  return new Web3(provider);
}

function App() {
  useEffect(() => {
    document.title = "NFT Marketplace";
  }, []);

  return (
    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="top-right"
      >
        <CookiesProvider>
          <AppContextProvider>
            <UserContextProvider>
              <Web3ReactProvider getLibrary={getLibrary}>
                <Suspense fallback={null}>
                  <BrowserRouter>
                    <View />
                  </BrowserRouter>
                  <CookieConsent />
                </Suspense>
              </Web3ReactProvider>
            </UserContextProvider>
          </AppContextProvider>
        </CookiesProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
