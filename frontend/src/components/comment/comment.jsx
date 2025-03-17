import { useContext, useState } from "react";
import userContext from "../context/userContext";
import commentApi from "../../helpers/commentApi";
import replyApi from "../../helpers/replyApi";
import Reply from "../reply/reply";

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
        <span>
            <p>{comment.author.username}</p>
            <p>{comment.body}</p>
            <p>{likes} likes</p>
            {comment.replies.map(r => {
                return <Reply reply={r} key={r.id} />;
            })}
            <input type="text" value={reply} onChange={e => setReply(e.target.value)} />
            <button onClick={handleReply}>reply</button>
            <button onClick={handleInteraction}>like comment</button>
        </span>
    );
}
