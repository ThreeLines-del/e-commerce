import { createContext, useEffect, useState } from "react";

interface DarkModeContextObjectType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Children {
  children: React.ReactNode;
}

export const DarkModeContextObject = createContext<DarkModeContextObjectType>({
  darkMode: false,
  setDarkMode: () => {},
});

function DarkModeProvider({ children }: Children) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const contextObj = {
    darkMode: darkMode,
    setDarkMode: setDarkMode,
  };
  return (
    <DarkModeContextObject.Provider value={contextObj}>
      {children}
    </DarkModeContextObject.Provider>
  );
}

export default DarkModeProvider;
