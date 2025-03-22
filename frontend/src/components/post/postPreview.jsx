import postApi from "../../helpers/postApi";
import { useContext, useRef, useState } from "react";
import PostFull from "./postFull";
import userContext from "../context/userContext";
import ImageCarousel from "./imageCarousel";
import { Link } from "react-router";
import heart from "../../assets/heart.svg";
import heartActive from "../../assets/heartActive.svg";
import comment from "../../assets/comment.svg";
import share from "../../assets/share.svg";
import bookmark from "../../assets/bookmark.svg";

export default function PostPreview({ post }) {
    const user = useContext(userContext) || {};
    const [likes, setLikes] = useState(post.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(post.likedBy.find(u => u.id === user.id));
    const [showFullBody, setShowFullBody] = useState(false);
    const postFullRef = useRef();
    const postBodyRef = useRef({});

    function handleInteraction() {
        postApi.interactOnPost({ id: post.id, type: likedByUser ? "dislike" : "like", authorId: post.author.id });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    return (
        <div className="pb-5 border-b-1 border-neutral-300 md:w-[30%]">
            <Link to={`/user/${post.author.username}`} className="flex items-center gap-3 ml-3 mb-2">
                <img src={post.author.profilePicture} alt="" className="size-8 rounded-full" />
                <p className="text-sm font-semibold">{post.author.username}</p>
            </Link>
            <ImageCarousel images={post.images} />
            <div className="flex gap-2 p-2">
                <button onClick={handleInteraction} className="size-7 cursor-pointer">
                    {likedByUser ? <img src={heartActive} /> : <img src={heart} />}
                </button>
                <button onClick={() => postFullRef.current.showModal()} className="size-6 cursor-pointer">
                    <img src={comment} />
                </button>
                <img src={share} className="size-6" />
                <img src={bookmark} className="size-6 ml-auto" />
            </div>
            <div className="pl-3 pr-[5px]">
                <p className="font-semibold">{likes} likes</p>
                <span className="flex gap-2">
                    <p className={`${showFullBody ? "w-full text-wrap" : "w-[95%] text-nowrap overflow-hidden"}`} ref={postBodyRef}>
                        <Link to={`/user/${post.author.username}`} className="font-semibold mr-2">
                            {post.author.username}
                        </Link>
                        {post.body}
                    </p>
                </span>
                {!showFullBody && postBodyRef.current.scrollLeftMax > 0 && (
                    <button onClick={() => setShowFullBody(true)} className="text-sm text-neutral-600">
                        Show More
                    </button>
                )}
            </div>
            <PostFull post={post} ref={postFullRef} likeHandler={handleInteraction} />
        </div>
    );
}
