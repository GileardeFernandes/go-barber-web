import React,{createContext, useCallback} from 'react';
import api from '../services/api';
interface SigInCredentials{
  email: string;
  password: string;
}

interface AuthContextProps {
  name: string;
  SigIn(credentials: SigInCredentials): void;
}



export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({children}) => {
  const SigIn = useCallback( async ({email, password}: SigInCredentials) => {
      const response = await api.post('session', {email, password});

      console.log(response.data);
  },[]);
 return (
   <AuthContext.Provider value={{name: 'Micael Fernandes', SigIn}}>
      {children}
   </AuthContext.Provider>
 );
}
