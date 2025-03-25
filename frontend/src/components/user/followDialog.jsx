import { useState } from "react";
import userApi from "../../helpers/userApi";
import { RotatingLines } from "react-loader-spinner";
import cancel from "../../assets/cancel.svg";
import { Link } from "react-router";
import SearchDialog from "../searchDialog";

export default function FollowDialog({ follows, ref, user = {}, label }) {
    const [activeBtn, setActiveBtn] = useState(null);
    const [search, setSearch] = useState("");
    const usersToShow = follows.filter(f => f.username.includes(search));

    function handleInteraction({ username, following }) {
        userApi.interactWithUser({ username, type: following ? "unfollow" : "follow", statusHandler: setActiveBtn });
        setActiveBtn(username);
    }

    if (follows.length === 0) return;

    return (
        <dialog
            ref={ref}
            className="relative min-w-screen min-h-screen shadow-sm shadow-neutral-600 md:rounded-xl md:min-w-[30%] md:min-h-[50%] md:max-h-[50%] md:m-auto"
        >
            <div>
                <span className="flex pt-2 pb-4 border-b-1 border-neutral-200">
                    <p className="w-[100%] mt-1 font-semibold text-center">{label}</p>
                    <button onClick={() => ref.current.close()} className="absolute right-2 cursor-pointer">
                        <img src={cancel} className="size-8" />
                    </button>
                </span>
                <SearchDialog value={search} handler={setSearch} />
                <div>
                    {usersToShow.map(f => {
                        const isFollowing = user.following.find(u => u.id === f.id);
                        const isUser = f.id === user.id;

                        return (
                            <div key={f.id} className="flex items-center p-2 pl-3 pr-3 mb-3 ">
                                <Link to={`/user/${f.username}`} className="w-[70%] flex items-center" onClick={() => ref.current.close()}>
                                    <img src={f.profilePicture} className="size-12 rounded-full" />
                                    <span className="ml-2 text-sm overflow-hidden overflow-ellipsis">
                                        <p className="font-semibold">{f.username}</p>
                                        <p className="text-[11px] text-neutral-600">{f.fullName}</p>
                                    </span>
                                </Link>
                                <button
                                    onClick={() => handleInteraction({ username: f.username, following: isFollowing })}
                                    disabled={activeBtn}
                                    className={`ml-auto mr-2 p-3 pt-[5px] pb-[5px] rounded-md text-sm font-semibold cursor-pointer ${
                                        isFollowing ? "bg-neutral-200 hover:bg-neutral-400" : "bg-sky-500 text-white hover:bg-sky-700"
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
