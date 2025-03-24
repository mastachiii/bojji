import { useContext, useState } from "react";
import userContext from "../context/userContext";

export default function PostInteract({ post, likeHandler }) {
    const user = useContext(userContext);
    const [likes, setLikes] = useState(post.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(post.likedBy.find(u => u.id === user.id));

    function handleLike() {
        likeHandler();
        setLikedByUser(!likedByUser);
        likedByUser ? setLikes(likes - 1) : setLikes(likes + 1);
    }

    return (
        <div>
            <p>{likes} likes</p>
            <button onClick={handleLike}>{likedByUser ? "dislike" : "like"}</button>
            <button>comment</button>
            <button>share</button>
            <button>bookmark</button>
        </div>
    );
}
