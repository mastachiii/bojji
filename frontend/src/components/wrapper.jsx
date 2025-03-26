import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";
import UserContext from "./context/userContext";

export default function Wrapper({ children }) {
    const [trigger, setTrigger] = useState(0);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData({ username: "" });
            console.log({data})
            setTimeout(() => {
                setTrigger(trigger + 1);
            }, 3000);

            setUserData(data);
        })();
    }, [trigger]);

    return (
        <UserContext.Provider value={userData}>
            <>{children}</>
        </UserContext.Provider>
    );
}
