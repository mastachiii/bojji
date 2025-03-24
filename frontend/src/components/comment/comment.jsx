import { useContext, useState } from "react";
import userContext from "../context/userContext";
import commentApi from "../../helpers/commentApi";
import replyApi from "../../helpers/replyApi";
import Reply from "../reply/reply";
import { Link } from "react-router";
import heart from "../../assets/heart.svg";
import heartActive from "../../assets/heartActive.svg";

export default function Comment({ comment }) {
    const user = useContext(userContext);
    const [likes, setLikes] = useState(comment.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(comment.likedBy.find(u => u.id === user.id));
    const [reply, setReply] = useState("");

    function handleInteraction() {
        commentApi.interactOnComment({ id: comment.id, type: likedByUser ? "dislike" : "like", authorId: comment.author.id });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    function handleReply() {
        replyApi.createReply({ id: comment.id, reply });
    }

    return (
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
                        {/* {comment.body} */}
                    </p>
                    <span className="flex gap-3 mt-2 text-xs text-neutral-600">
                        <p className="">{new Date(comment.createdAt).toLocaleDateString()}</p>
                        <button>Reply</button>
                    </span>
                </span>
                <button onClick={handleInteraction} className="w-[7%] mt-auto mb-auto ml-3 mr-2">
                    <img src={likedByUser ? heartActive : heart} className="w-full mb-2" />
                </button>
            </div>
            {/* <p>{likes} likes</p> */}
            {/* {comment.replies.map(r => {
                return <Reply reply={r} key={r.id} />;
            })} */}
            {/* <input type="text" value={reply} onChange={e => setReply(e.target.value)} />
            <button onClick={handleReply}>reply</button>
            <button onClick={handleInteraction}>like comment</button> */}
        </div>
    );
}
