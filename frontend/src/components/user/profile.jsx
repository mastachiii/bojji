import { useEffect, useState } from "react";
import { useParams } from "react-router";
import userApi from "../../helpers/userApi";

export default function Profile() {
    const params = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData({ id: params.id });

            setUser(data);
        })();
    }, [params.id]);

    if (user) {
        console.log({ user });
        return (
            <div>
                <h3>{user.username}</h3>
                <p>{user.followers}</p>
                <p>{user.following}</p>
                <button>FOLLOW USER</button>
            </div>
        );
    }
}
