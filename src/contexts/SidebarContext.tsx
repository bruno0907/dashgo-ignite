import { UseDisclosureReturn } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

interface SidebarDrawerContextProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextProps = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextProps);

function SidebarDrawerProvider({ children }: SidebarDrawerContextProviderProps) {
  const disclosure = useDisclosure();
  const { asPath } = useRouter()

  useEffect(() => disclosure.onClose(), [asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

const useSidebarDrawer = () => useContext(SidebarDrawerContext);

export {
  useSidebarDrawer,
  SidebarDrawerProvider
};
