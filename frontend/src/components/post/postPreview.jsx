import postApi from "../../helpers/postApi";
import { useContext, useRef, useState } from "react";
import PostFull from "./postFull";
import userContext from "../context/userContext";
import ImageCarousel from "./imageCarousel";

export default function PostPreview({ post }) {
    const user = useContext(userContext) || {};
    const [likes, setLikes] = useState(post.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(post.likedBy.find(u => u.id === user.id));
    const postFullRef = useRef();

    function handleInteraction() {
        postApi.interactOnPost({ id: post.id, type: likedByUser ? "dislike" : "like", authorId: post.author.id });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    return (
        <div>
            <p>{post.author.username}</p>
            <ImageCarousel images={post.images} />
            <p>{likes} likes</p>
            <p>{post.body}</p>
            <button onClick={handleInteraction}>{likedByUser ? "DISLIKE" : "LIKE"}</button>
            <button onClick={() => postFullRef.current.showModal()}>OPEN</button>
            <PostFull post={post} ref={postFullRef} likeHandler={handleInteraction} />
        </div>
    );
}
