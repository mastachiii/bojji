import { useState } from "react";
import userApi from "../../helpers/userApi";
import { RotatingLines } from "react-loader-spinner";
import cancel from "../../assets/cancel.svg";

export default function FollowDialog({ follows, ref, user, label }) {
    const [activeBtn, setActiveBtn] = useState(null);
    const [search, setSearch] = useState("");
    const usersToShow = follows.filter(f => f.username.includes(search));

    function handleInteraction({ username, following }) {
        userApi.interactWithUser({ username, type: following ? "unfollow" : "follow", statusHandler: setActiveBtn });
        setActiveBtn(username);
    }

    return (
        <dialog ref={ref} className="relative min-w-screen min-h-screen">
            <div>
                <span className="flex pt-2 pb-4 border-b-1 border-neutral-200">
                    <p className="w-[100%] font-semibold text-center">{label}</p>
                    <button onClick={() => ref.current.close()} className="absolute right-2 cursor-pointer">
                        <img src={cancel} className="size-8"/>
                    </button>
                </span>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                <div>
                    {usersToShow.map(f => {
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
                </div>
            </div>
        </dialog>
    );
}
