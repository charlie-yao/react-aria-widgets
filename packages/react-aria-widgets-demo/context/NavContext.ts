import { createContext } from 'react';

export interface NavContextType {
  isNavExpanded: boolean;
  setNavExpanded: (isNavExpanded: boolean) => void;
}

const NavContext = createContext<NavContextType | null>(null);

export default NavContext;
