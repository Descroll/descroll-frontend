import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('descroll_token');
        if(!token){
            setAuthLoading(false);
            return;
        }

        apiFetch('/me/user')
        .then((res) => {
            if (!res.ok) throw new Error("Not authenticated");
            return res.json();
        })
        .then((data) => setCurrentUser(data))
        .catch(() => {
            localStorage.removeItem('descroll_token');
            setCurrentUser(null);
        })
        .finally(() => setAuthLoading(false));
    }, []);

    const login = (user) => setCurrentUser(user);
    const logout = () => {
        localStorage.removeItem('descroll_token');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, authLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}