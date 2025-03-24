import { useContext, useState } from "react";
import replyApi from "../../helpers/replyApi";
import userContext from "../context/userContext";
import heart from "../../assets/heart.svg";
import heartActive from "../../assets/heartActive.svg";
import { Link } from "react-router";

export default function Reply({ reply }) {
    const user = useContext(userContext);
    const [likes, setLikes] = useState(reply.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(user && reply.likedBy.find(u => u.id === user.id));

    function handleInteraction() {
        replyApi.interactOnReply({ id: reply.id, type: likedByUser ? "dislike" : "like" });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    return (
        <div className="flex text-sm">
            <Link to={`/user/${reply.author.username}`}>
                <img src={reply.author.profilePicture} className="size-10 rounded-full mr-2" />
            </Link>
            <div className="w-[100%] flex ml-2">
                <span className="w-full">
                    <p className=" text-wrap">
                        <div className="float-left h-1 pb-2 pr-1">
                            <Link to={`/user/${reply.author.username}`} className="h-fit">
                                <p className="w-fit h-fit font-semibold">{reply.author.username}</p>
                            </Link>
                        </div>
                        <div className="float-none">
                            <p className=" text-wrap">{reply.body}</p>
                        </div>
                        {/* {reply.body} */}
                    </p>
                    <span className="flex gap-3 mt-2 text-xs text-neutral-600">
                        <p className="">{new Date(reply.createdAt).toLocaleDateString()}</p>
                        <p>{reply.likedBy.length} likes</p>
                    </span>
                </span>
                <button onClick={handleInteraction} className="w-[7%] mt-auto mb-auto ml-3 mr-2">
                    <img src={likedByUser ? heartActive : heart} className="w-full mb-2" />
                </button>
            </div>
        </div>
    );
}
