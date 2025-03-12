import postApi from "../../helpers/postApi";
import { useContext, useRef, useState } from "react";
import PostFull from "./postFull";
import userContext from "../context/userContext";

export default function PostPreview({ post }) {
    const [likes, setLikes] = useState(post.likedBy.length);
    const user = useContext(userContext) || {};
    const [likedByUser, setLikedByUser] = useState(post.likedBy.find(u => u.id === user.id));
    const postFullRef = useRef();

    function handleInteraction() {
        postApi.interactOnPost({ id: post.id, type: likedByUser ? "dislike" : "like" });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    return (
        <div>
            <p>{post.author.username}</p>
            {post.images.map(i => {
                return <img src={i} style={{ width: "300px" }} />;
            })}
            <p>{likes} likes</p>
            <p>{post.body}</p>
            <button onClick={handleInteraction}>{likedByUser ? "DISLIKE" : "LIKE"}</button>
            <button onClick={() => postFullRef.current.showModal()}>OPEN</button>
            <PostFull post={post} ref={postFullRef} likeHandler={handleInteraction} />
        </div>
    );
}
