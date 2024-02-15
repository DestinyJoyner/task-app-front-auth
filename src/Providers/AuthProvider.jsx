import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthData = createContext()
export function useAuthDataProvider() {
    return useContext(AuthData)
}

function AuthProvider({children}) {
    const API = import.meta.env.VITE_BASE_URL
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const isAuthenticated = user && token

    axios.defaults.headers.common["Authorization"] = `${token}`;

    useEffect(() => {
        axios.get(`${API}/users`).then(({data}) => console.log(data)).catch(err => console.log(err))
    },[token])
    return (
        <AuthData.Provider 
        value={{
            API,
            user,
            setUser,
            token,
            setToken,
            isAuthenticated
            }}>

            {children}
        </AuthData.Provider>
    );
}

export default AuthProvider;