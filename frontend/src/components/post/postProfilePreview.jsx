import { useContext, useRef, useState } from "react";
import userContext from "../context/userContext";
import postApi from "../../helpers/postApi";
import PostFull from "./postFull";

export default function PostProfilePreview({ post }) {
    const user = useContext(userContext) || {};
    const postFullRef = useRef();
    const [likedByUser, setLikedByUser] = useState(post.likedBy && post.likedBy.find(u => u.id === user.id));

    function handleLike() {
        postApi.interactOnPost({ id: post.id, type: likedByUser ? "dislike" : "like", authorId: post.author.id });
        setLikedByUser(!likedByUser);
    }

    return (
        <div>
            <img src={post.images[0]} className="w-full h-40 md:h-100 opacity-100 transition duration-100 ease-in cursor-pointer hover:scale-101" onClick={() => postFullRef.current.showModal()} />
            <PostFull post={post} likeHandler={handleLike} ref={postFullRef} />
        </div>
    );
}
