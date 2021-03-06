import React, {useEffect, useState} from 'react';
import {LoginContextType, User} from "../types/Types";
import Cookies from "js-cookie";
import axios from "axios";

export const LoginContext = React.createContext<LoginContextType>({} as LoginContextType);

const LoginContextProvider: React.FC = ({children}) => {

    const [loggedInUser, setLoggedInUser] = useState<User | null>();
    const [isGrafanaAuthenticated, setIsGrafanaAuthenticated] = useState(false);

    useEffect(() => {
        const hashToken = Cookies.get('hash');
        let unmounted = false;

        if (!hashToken) return;

        const getUserFromApi = async () => {
            const user = await axios.get(`${process.env.REACT_APP_API_URL}/api/social_user/${hashToken}`);

            if (!unmounted && user) {
                setLoggedInUser(user.data);
            }
        }

        if (Cookies.get('hash')) {
            getUserFromApi();
        }

        return () => {
            unmounted = true;
        }
    }, []);

    return (
        <LoginContext.Provider value={{loggedInUser, setLoggedInUser, isGrafanaAuthenticated, setIsGrafanaAuthenticated}}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;