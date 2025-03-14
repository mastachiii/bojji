import { useContext, useState } from "react";
import userContext from "../context/userContext";
import postApi from "../../helpers/postApi";

export default function Comment({ comment }) {
    const user = useContext(userContext);
    const [likes, setLikes] = useState(comment.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(comment.likedBy.find(u => u.id === user.id));

    function handleInteraction() {
        postApi.interactOnComment({ id: comment.id, type: likedByUser ? "dislike" : "like" });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    return (
        <span>
            <p>{comment.author.username}</p>
            <p>{comment.body}</p>
            <p>{likes} likes</p>
            <button onClick={handleInteraction}>like comment</button>
        </span>
    );
}
