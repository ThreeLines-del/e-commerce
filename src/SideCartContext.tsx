import { createContext, useState } from "react";

interface SideCartObjectType {
  isSideCartOpen: boolean;
  setIsSideCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Children {
  children: React.ReactNode;
}

export const SideCartContextObject = createContext<SideCartObjectType>({
  isSideCartOpen: false,
  setIsSideCartOpen: () => {},
});

function SideCartContextProvider({ children }: Children) {
  const [isSideCartOpen, setIsSideCartOpen] = useState<boolean>(false);

  const contextObj = {
    isSideCartOpen: isSideCartOpen,
    setIsSideCartOpen: setIsSideCartOpen,
  };
  return (
    <SideCartContextObject.Provider value={contextObj}>
      {children}
    </SideCartContextObject.Provider>
  );
}

export default SideCartContextProvider;
