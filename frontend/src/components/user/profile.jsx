import { useEffect, useState } from "react";
import { useParams } from "react-router";
import userApi from "../../helpers/userApi";

export default function Profile() {
    const params = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData({ username: params.username });

            setUser(data);
        })();
    }, [params.username]);

    if (user) {
        return (
            <div>
                <h3>{user.username}</h3>
                <img src={user.profilePicture} style={{ width: "100px" }} />
                <p>{user.bio}</p>
                <p>FOLLOWERS - {user.followers && user.followers.length}</p>
                <p>FOLLOWING - {user.following && user.following.length}</p>
                <button onClick={() => userApi.followUser({ username: user.username })}>FOLLOW USER</button>
            </div>
        );
    }
}
