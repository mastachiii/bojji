import { useState } from "react";
import userApi from "../../helpers/userApi";
import { RotatingLines } from "react-loader-spinner";

export default function FollowDialog({ follows, ref, user, followingHandler }) {
    const [activeBtn, setActiveBtn] = useState(null);

    function handleInteraction({ username, following }) {
        following ? followingHandler(follows.length - 1) : followingHandler(follows.length + 1);

        userApi.interactWithUser({ username, type: following ? "unfollow" : "follow", statusHandler: setActiveBtn });
        setActiveBtn(username);
    }

    return (
        <dialog ref={ref} open={true}>
            {follows.map(f => {
                const isFollowing = user.following.find(u => u.id === f.id);
                const isUser = f.id === user.id;

                return (
                    <div key={f.id}>
                        <img src={f.profilePicture} className="size-10" />
                        <p>{f.username}</p>
                        <button
                            onClick={() => handleInteraction({ username: f.username, following: isFollowing })}
                            disabled={activeBtn}
                            className={`${isUser && "hidden"}`}
                        >
                            {activeBtn === f.username ? <RotatingLines width="10" /> : isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                );
            })}
        </dialog>
    );
}
