import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [ usuario, setUsuario] = useState(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    });

    function entrar(token) {
        localStorage.setItem("token", token);
        const dadosUsuario = jwtDecode(token);
        setUsuario(dadosUsuario);
    }

    function sair() {
        localStorage.removeItem("token");
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, entrar, sair }}>
            {children}
        </AuthContext.Provider> 
    );
}

export function useAuth() {
    return useContext(AuthContext);
}