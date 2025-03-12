import postApi from "../../helpers/postApi";
import { useRef, useState } from "react";
import PostFull from "./postFull";

export default function PostPreview({ post }) {
    const [likes, setLikes] = useState(post.likedBy.length);
    const postFullRef = useRef();

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
            <button onClick={() => postFullRef.current.showModal()}>OPEN</button>
            <PostFull post={post} ref={postFullRef} likeHandler={handleLike} />
        </div>
    );
}
