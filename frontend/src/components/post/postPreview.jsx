import postApi from "../../helpers/postApi";
import { useState } from "react";

export default function PostPreview({ post }) {
    const [likes, setLikes] = useState(post.likedBy.length);

    function handleLike() {
        postApi.likePost({ id: post.id });

        setLikes(likes + 1);
    }

    return (
        <div>
            <p>{post.author.username}</p>
            {post.images.map(i => {
                return <img src={i} style={{ width: "300px" }} />;
            })}
            <p>{likes} likes</p>
            <p>{post.body}</p>
            <button onClick={handleLike}>LIKE</button>
        </div>
    );
}
