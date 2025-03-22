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
        <div className="flex">
            <Link to={`/user/${comment.author.username}`}>
                <img src={comment.author.profilePicture} className="size-10 rounded-full mr-2" />
            </Link>
            <span className="w-[80%] flex">
                <p className="flex text-wrap">
                    <Link to={`/user/${comment.author.username}`} className="mr-1">
                        <p>{comment.author.username}</p>
                    </Link>
                    {/* {comment.body} */}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti corrupti architecto error voluptates nesciunt doloremque cumque
                    sed non, quam temporibus.
                </p>
                <button onClick={handleInteraction} className="ml-auto">
                    <img src={likedByUser ? heartActive : heart} className="min-w-[1px] min-h-[1px] mb-2" />
                </button>
            </span>
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
