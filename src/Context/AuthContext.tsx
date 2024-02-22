import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: () => boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    getUsername: () => string | null;
    getEmail: () => string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    const isAuthenticated = () => !!user;

    const login = (email: string, password: string) => {
        setUser(email);
        setUser(password);
    };

    const logout = () => {
        setUser(null);
    };

    const getUsername = () => user || '';
    const getEmail = () => user || '';

    const contextValue: AuthContextProps = {
        isAuthenticated,
        login,
        logout,
        getUsername,
        getEmail,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
