import { createContext, useState, ReactNode, useEffect } from "react";
import { UserWithToken } from "../../ForFable-Domain";
import { ReactDuo } from "../utils/react";

export const UserContext = createContext<ReactDuo<UserWithToken|null>>(
    [null, () => {}]
)

export const UserProvider = ({ children }: {children: ReactNode}) => {
    const localUser = localStorage.getItem('user')
    const userDuo = useState<UserWithToken | null>(
        localUser
            ? JSON.parse(localUser)
            : null
    )

    const [user,] =userDuo

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider value={userDuo}>
            {children}
        </UserContext.Provider>
    )
};
