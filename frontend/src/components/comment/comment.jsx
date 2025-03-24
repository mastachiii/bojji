import { useContext, useState } from "react";
import userContext from "../context/userContext";
import commentApi from "../../helpers/commentApi";
import Reply from "../reply/reply";
import { Link } from "react-router";
import heart from "../../assets/heart.svg";
import heartActive from "../../assets/heartActive.svg";

export default function Comment({ comment, replyHandler }) {
    const user = useContext(userContext);
    const [likes, setLikes] = useState(comment.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(comment.likedBy.find(u => u.id === user.id));
    const [showReplies, setShowReplies] = useState(false);

    function handleInteraction() {
        commentApi.interactOnComment({ id: comment.id, type: likedByUser ? "dislike" : "like", authorId: comment.author.id });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    return (
        <div>
            <div className="flex text-sm">
                <Link to={`/user/${comment.author.username}`}>
                    <img src={comment.author.profilePicture} className="size-10 rounded-full mr-2" />
                </Link>
                <div className="w-[100%] flex ml-2">
                    <span className="w-full">
                        <p className=" text-wrap">
                            <div className="float-left h-1 pb-2 pr-1">
                                <Link to={`/user/${comment.author.username}`} className="h-fit">
                                    <p className="w-fit h-fit font-semibold">{comment.author.username}</p>
                                </Link>
                            </div>
                            <div className="float-none">
                                <p className=" text-wrap">{comment.body}</p>
                            </div>
                        </p>
                        <span className="flex gap-3 mt-2 text-xs text-neutral-600">
                            <p className="">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            <p>{comment.likedBy.length} likes</p>
                            <button onClick={() => replyHandler({ user: comment.author, comment })}>Reply</button>
                        </span>
                    </span>
                    <button onClick={handleInteraction} className="w-[7%] mt-auto mb-auto ml-3 mr-2">
                        <img src={likedByUser ? heartActive : heart} className="w-full mb-2 md:size-5" />
                    </button>
                </div>
            </div>
            <div className="pl-12 mt-2">
                {comment.replies.length > 0 && (
                    <button onClick={() => setShowReplies(!showReplies)} className="flex items-center gap-1 text-xs text-neutral-600">
                        <div className="w-7 h-[1px] bg-neutral-400"></div>
                        <p>{!showReplies ? `View Replies (${comment.replies.length})` : "Hide replies"}</p>
                    </button>
                )}
                <div className={`flex flex-col gap-4 mt-4 ${showReplies ? "block" : "hidden"}`}>
                    {comment.replies.map(r => {
                        return <Reply reply={r} key={r.id} />;
                    })}
                </div>
            </div>
        </div>
    );
}
