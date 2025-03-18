import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import userApi from "../../helpers/userApi";
import userContext from "../context/userContext";
import Back from "../../assets/back.svg";
import ProfileButton from "./profileButton";
import EmptyPosts from "./emptyPosts";
import { Link } from "react-router";
import FollowDialog from "./followDialog";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState();
    const params = useParams();
    const userData = useContext(userContext);
    const followerDialogRef = useRef();
    const followingDialogRef = useRef();

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData({ username: params.username });

            if (!data) return (window.location.href = "/");

            setUser(data);
        })();
    }, [params.username]);

    if (user && userData) {
        const isUser = user.id === userData.id;
        const followingUser = userData.following.find(u => u.id === user.id);

        function handleInteraction() {
            setStatus("INTERACTING");
            userApi.interactWithUser({ username: user.username, type: followingUser ? "unfollow" : "follow", statusHandler: setStatus });
        }

        const interactBtns = (
            <>
                <ProfileButton
                    label={isUser ? "Edit Profile" : followingUser ? "Unfollow" : "Follow"}
                    handler={handleInteraction}
                    btnActive={status !== "INTERACTING"}
                />
                {!isUser && <ProfileButton label={"Message"} btnActive={true} />}
            </>
        );

        return (
            <div className="font-sans md:w-[50%] md:ml-auto md:mr-auto md:mt-2">
                <div className="w-full flex pl-3 pb-2 pt-2 border-b-1 border-neutral-200 md:hidden">
                    <Link to="/" className="w-[10%]">
                        <img src={Back} className="size-4" />
                    </Link>
                    <p className="w-[80%] text-sm font-semibold text-center">{user.username}</p>
                </div>
                <div className="flex items-center p-3">
                    <img src={user.profilePicture} className="size-17 mt-3 rounded-full md:size-25" />
                    <div className="md:flex md:flex-col md:ml-10">
                        <span className={`hidden md:flex`}>
                            <p className="mr-4">{user.username}</p>
                            <span className="flex gap-2 mb-4">{interactBtns}</span>
                        </span>
                        <span className="flex gap-7 justify-center ml-10 md:ml-0 md:justify-start">
                            <span className="flex flex-col items-center text-xs md:flex-row md:gap-1">
                                <p className="font-semibold">{user.posts.length}</p>
                                <p className="text-neutral-500">posts</p>
                            </span>
                            <span
                                onClick={() => followerDialogRef.current.showModal()}
                                className="flex flex-col items-center text-xs cursor-pointer md:flex-row md:gap-1"
                            >
                                <p className="font-semibold">{user.followers.length}</p>
                                <p className="text-neutral-500">followers</p>
                            </span>
                            <span
                                className="flex flex-col items-center text-xs cursor-pointer md:flex-row md:gap-1"
                                onClick={() => followingDialogRef.current.showModal()}
                            >
                                <p className="font-semibold">{user.following.length}</p>
                                <p className="text-neutral-500">following</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="pl-4 pr-4 pb-7 border-b-1 border-neutral-200 md:pl-38">
                    <h3 className="text-xs font-semibold">{user.fullName}</h3>
                    <p className="text-xs">{user.bio}</p>
                    <span className="flex gap-2 mt-5 md:hidden">{interactBtns}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-1 justify-center">
                    {user.posts.length >= 1 ? (
                        user.posts.map(p => {
                            return <img src={p.images[0]} className="w-full min-h-40 md:min-h-90" />;
                        })
                    ) : (
                        <EmptyPosts />
                    )}
                </div>
                <FollowDialog follows={user.following} ref={followingDialogRef} user={userData} label={"Following"} />
                <FollowDialog follows={user.followers} ref={followerDialogRef} user={userData} label={"Followers"} />
            </div>
        );
    }
}
