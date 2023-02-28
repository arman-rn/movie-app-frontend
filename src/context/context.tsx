import React, { useContext, useState, useEffect, useCallback } from 'react';
import { saveTheme, getTheme } from '../utils/helper';


const context = React.createContext({
  showThemeOptions: false,
  toogleThemeOptions: () => {},
  showSideBar: false,
  activeTheme: 'System',
  setActiveTheme: (newTheme: string) => {},
  setTheme: (newTheme: string) => {},
  checkSystemTheme: () => {},
  setShowSideBar: (prevValue: boolean) => {},
  setVideoId: (prevValue: string) => {},
  theme: '',
  videoId: '',
  toggleModal: () => {},
  isModalOpen: false,
});

interface Props {
  children: React.ReactNode;
}

const initialTheme = getTheme();

const GlobalContextProvider = ({ children }: Props) => {
  const [showThemeOptions, setShowThemeOptions] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>(initialTheme);
  const [activeTheme, setActiveTheme] = useState<string>(initialTheme || 'System');
  const [videoId, setVideoId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkSystemTheme = useCallback(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('Dark');
    } else {
      setTheme('Light');
    }
  }, []);

  // check theme stored in local storage;
  const checkTheme = useCallback(() => {
    if (initialTheme) return;
    checkSystemTheme();
  }, [checkSystemTheme]);

  useEffect(() => {
    checkTheme();
  }, []);

  useEffect(() => {
    if (theme === 'Dark') {
      document.documentElement.classList.add('dark');
      saveTheme('Dark');
    } else if (theme === 'Light') {
      document.documentElement.classList.remove('dark');
      saveTheme('Light');
    }
  }, [theme]);

  const toogleThemeOptions = useCallback(() => {
    setShowThemeOptions((prev) => !prev);
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <context.Provider
      value={{
        showThemeOptions,
        toogleThemeOptions,
        showSideBar,
        activeTheme,
        setActiveTheme,
        setTheme,
        theme,
        checkSystemTheme,
        setShowSideBar,
        videoId,
        toggleModal,
        isModalOpen,
        setVideoId,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  return useContext(context);
};
