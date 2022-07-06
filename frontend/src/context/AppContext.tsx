import React, { createContext, useState, useContext, FC, useEffect } from "react";
import PropTypes from "prop-types";

// export interface AppContextValue {
//     children?: any; // TODO: type should be defined correctly based on react, like React.ElementRef
//     loading?: boolean;
//     message?: { open: boolean };

//     setLoading?: any;
//     setMessage?: any;
// }

// export const appContextDefaultValue: AppContextValue = {}
interface AppContextInfterface {
  loading?: boolean;
  setLoading?: any;
  message?: any;
  setMessage?: any;
  modal?: any;
  setModal?: any;
  settings?: any;
  setSettings?: any;
  isCookiePopup?:boolean;
  setCookiePopup?: any;
}

const defaultState: AppContextInfterface = {};

export const AppContext = createContext(defaultState);

const AppContextProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ open: false });
  const [modal, setModal] = useState({ open: false });
  const [settings, setSettings] = useState([]);
  const [isCookiePopup, setCookiePopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("consent") === null) setCookiePopup(true);
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        message,
        setMessage,
        modal,
        setModal,
        settings,
        setSettings,
        isCookiePopup,
        setCookiePopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.object,
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);
