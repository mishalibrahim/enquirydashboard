'use client'

// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

// Create a Context
const AuthContext = createContext();

// Create a Provider Component
const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
    });

    useEffect(() => {
        // Retrieve tokens from local storage when the component mounts
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (accessToken && refreshToken) {
          setAuthState({ accessToken, refreshToken });
        }
      }, []);
    

    // Function to update tokens
    const updateTokens = (accessToken, refreshToken) => {
        setAuthState({ accessToken, refreshToken });
    };
    const clearTokens = () =>{
        setAuthState({accessToken:null,refreshToken:null})
    }

    return (
        <AuthContext.Provider value={{ authState, updateTokens, clearTokens }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
