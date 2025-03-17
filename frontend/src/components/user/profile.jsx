import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import userApi from "../../helpers/userApi";
import userContext from "../context/userContext";
import Back from "../../assets/back.svg";
import ProfileButton from "./profileButton";
import EmptyPosts from "./emptyPosts";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState();
    const params = useParams();
    const userData = useContext(userContext);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData({ username: params.username });

            setUser(data);
        })();
    }, [params.username]);

    if (user) {
        console.log({ user });
        const isUser = user.id === userData.id;
        const followingUser = userData.following.find(u => u.id === user.id);

        function handleInteraction() {
            setStatus("INTERACTING");
            userApi.interactWithUser({ username: user.username, type: followingUser ? "unfollow" : "follow", statusHandler: setStatus });
        }

        return (
            <div className="font-sans">
                <div className="w-full flex pl-3 pb-2 pt-2 border-b-1 border-neutral-200">
                    <button className="w-[10%]">
                        <img src={Back} className="size-4" />
                    </button>
                    <p className="w-[80%] text-sm font-semibold text-center">{user.username}</p>
                </div>
                <div className="flex items-center p-3">
                    <img src={user.profilePicture} className="size-17 mt-3 rounded-full" />
                    <span className="flex gap-7 justify-center ml-10">
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
                <div className="pl-4 pr-4 pb-7 border-b-1 border-neutral-200">
                    <h3 className="text-xs font-semibold">{user.fullName}</h3>
                    <p className="text-xs">{user.bio}</p>
                    <span className="flex gap-2 mt-5">
                        <ProfileButton
                            label={isUser ? "Edit Profile" : followingUser ? "Unfollow" : "Follow"}
                            handler={handleInteraction}
                            btnActive={status !== "INTERACTING"}
                        />
                        {!isUser && <ProfileButton label={"Message"} btnActive={true}/>}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-1">
                    {user.posts.length >= 1 ? user.posts.map(p => {
                        return <img src={p.images[0]} className="w-full min-h-40 max-h-40" />;
                    }) : <EmptyPosts />}
                </div>
            </div>
        );
    }
}
