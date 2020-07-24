import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SigInCredentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: object;
  SigIn(credentials: SigInCredentials): void;
  SignOut(): void;
}

interface AuthState {
  token: string;
  user: Object;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const SigIn = useCallback(async ({ email, password }: SigInCredentials) => {
    const response = await api.post('session', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  const SignOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, SigIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('UseAth must be used within an AuthProvider');
  }

  return context;
}
