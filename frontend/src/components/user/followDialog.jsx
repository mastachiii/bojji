import { useState } from "react";
import userApi from "../../helpers/userApi";
import { RotatingLines } from "react-loader-spinner";
import cancel from "../../assets/cancel.svg";
import searchImg from "../../assets/search.svg";
import clear from "../../assets/clear.svg";
import { Link } from "react-router";

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
                    <p className="w-[100%] mt-1 font-semibold text-center">{label}</p>
                    <button onClick={() => ref.current.close()} className="absolute right-2 cursor-pointer">
                        <img src={cancel} className="size-8" />
                    </button>
                </span>
                <div className="w-[95%] flex p-2 ml-auto mr-auto mt-3 mb-4 rounded-md bg-neutral-100">
                    <button>
                        <img src={searchImg} className="size-5" />
                    </button>
                    <input
                        type="text"
                        value={search}
                        placeholder={"Search"}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full ml-1 mr-1 text-[14px] outline-0"
                    />
                    <button onClick={() => setSearch("")}>
                        <img src={clear} className="size-5 cursor-pointer" />
                    </button>
                </div>
                <div>
                    {usersToShow.map(f => {
                        const isFollowing = user.following.find(u => u.id === f.id);
                        const isUser = f.id === user.id;

                        return (
                            <div key={f.id} className="flex items-center p-2 pl-3 pr-3">
                                <Link to={`/user/${f.username}`} className="w-[70%] flex items-center" onClick={() => ref.current.close()}>
                                    <img src={f.profilePicture} className="size-14 rounded-full" />
                                    <span className="ml-2 text-sm overflow-hidden overflow-ellipsis">
                                        <p className="font-semibold">{f.username}</p>
                                        <p className="text-[11px] text-neutral-600">{f.fullName}</p>
                                    </span>
                                </Link>
                                <button
                                    onClick={() => handleInteraction({ username: f.username, following: isFollowing })}
                                    disabled={activeBtn}
                                    className={`ml-auto mr-2 p-3 pt-[5px] pb-[5px] rounded-md text-sm font-semibold cursor-pointer ${
                                        isFollowing ? "bg-neutral-200" : "bg-sky-500 text-white"
                                    }  ${isUser && "hidden"}`}
                                >
                                    {activeBtn === f.username ? <RotatingLines width="10" /> : isFollowing ? "Following" : "Follow"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </dialog>
    );
}
