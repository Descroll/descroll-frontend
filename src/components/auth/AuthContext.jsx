import { createContext, useContext, useState, useEffect } from "react";
import BASE_URL from '../../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URL}/me/user`, { credentials: "include" })
        .then((res) => {
            if (!res.ok) throw new Error("Not authenticated");
            return res.json();
        })
        .then((data) => setCurrentUser(data))
        .catch(() => setCurrentUser(null))
        .finally(() => setAuthLoading(false));
    }, []);

    const login = (user) => setCurrentUser(user);
    const logout = () => setCurrentUser(null);

    return (
        <AuthContext.Provider value={{ currentUser, authLoading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}