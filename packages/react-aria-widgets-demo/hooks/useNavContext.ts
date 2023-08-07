import { useContext } from 'react';

//Contexts
import NavContext from '../context/NavContext';

export default function useNavContext() {
  const navContext = useContext(NavContext);

  if(!navContext)
    throw new Error('useNavContext must be used within a <NavContext.Provider>.');

  return navContext;
};
