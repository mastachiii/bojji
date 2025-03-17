import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import userApi from "../../helpers/userApi";
import userContext from "../context/userContext";

export default function Profile() {
    const [user, setUser] = useState(null);
    const params = useParams();
    const userData = useContext(userContext);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData({ username: params.username });

            setUser(data);
        })();
    }, [params.username]);

    if (user) {
        const isUser = user.id === userData.id;

        return (
            <div>
                <div className="w-full flex pl-3 pb-2 pt-2">
                    <button className="w-[10%]">back</button>
                    <p className="w-[80%] text-center">{user.username}</p>
                </div>
                <div className="flex">
                    <img src={user.profilePicture} className="size-15 mt-3 rounded-full" />
                    <div>
                        <span className="flex">
                            <h3>{user.username}</h3>
                            <button>{isUser ? "Edit Profile" : "Follow User"}</button>
                            {!isUser && <button>Message</button>}
                        </span>
                        <span className="flex">
                            <p>{user.posts.length} posts</p>
                            <p>{user.following.length} following</p>
                            <p>{user.followers.length} followers</p>
                        </span>
                    </div>
                </div>
                <p>{user.fullName}</p>
                <p>{user.bio}</p>
            </div>
        );
    }
}
