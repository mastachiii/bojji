import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import userApi from "../../helpers/userApi";
import userContext from "../context/userContext";
import Back from "../../assets/back.svg";
import ProfileButton from "./profileButton";

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
            <div className="font-sans">
                <div className="w-full flex pl-3 pb-2 pt-2 border-b-1 border-neutral-200">
                    <button className="w-[10%]">
                        <img src={Back} className="size-4" />
                    </button>
                    <p className="w-[80%] text-sm font-semibold text-center">{user.username}</p>
                </div>
                <div className="flex items-center p-3">
                    <img src={user.profilePicture} className="size-15 mt-3 rounded-full" />
                    <span className="flex gap-10 justify-center ml-10">
                        <span className="flex flex-col items-center text-xs">
                            <p className="font-semibold">{user.posts.length}</p>
                            <p className="text-neutral-500">posts</p>
                        </span>
                        <span className="flex flex-col items-center text-xs">
                            <p className="font-semibold">{user.followers.length}</p>
                            <p className="text-neutral-500">followers</p>
                        </span>
                        <span className="flex flex-col items-center text-xs">
                            <p className="font-semibold">{user.following.length}</p>
                            <p className="text-neutral-500">following</p>
                        </span>
                    </span>
                </div>
                <div>
                    <h3>{user.username}</h3>
                    <span className="flex mt-2 ">
                        <ProfileButton label={isUser ? "Edit Profile" : "Following"} />
                        {!isUser && <ProfileButton label={"Message"} />}
                    </span>
                </div>
                <p>{user.fullName}</p>
                <p>{user.bio}</p>
            </div>
        );
    }
}
