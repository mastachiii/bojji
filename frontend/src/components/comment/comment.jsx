import { useContext, useState } from "react";
import userContext from "../context/userContext";
import commentApi from "../../helpers/commentApi";

export default function Comment({ comment }) {
    const user = useContext(userContext);
    const [likes, setLikes] = useState(comment.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(comment.likedBy.find(u => u.id === user.id));
    const [reply, setReply] = useState("");

    function handleInteraction() {
        commentApi.interactOnComment({ id: comment.id, type: likedByUser ? "dislike" : "like" });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    function handleReply() {
        commentApi.replyOnComment({ id: comment.id, reply });
    }
    console.log({ comment });
    return (
        <span>
            <p>{comment.author.username}</p>
            <p>{comment.body}</p>
            <p>{likes} likes</p>
            {comment.replies.map(r => {
                return (
                    <span>
                        <p>{r.author.username}</p>
                        <p>{r.body}</p>
                    </span>
                );
            })}
            <input type="text" value={reply} onChange={e => setReply(e.target.value)} />
            <button onClick={handleReply}>reply</button>
            <button onClick={handleInteraction}>like comment</button>
        </span>
    );
}
