import { useContext, useRef, useState } from "react";
import userContext from "../context/userContext";
import heart from "../../assets/heart.svg";
import heartActive from "../../assets/heartActive.svg";
import comment from "../../assets/comment.svg";
import share from "../../assets/share.svg";
import bookmark from "../../assets/bookmark.svg";
import FollowDialog from "../user/followDialog";

export default function PostInteract({ post, likeHandler, children }) {
    const user = useContext(userContext) || {};
    const [likes, setLikes] = useState(post.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(post.likedBy.find(u => u.id === user.id));
    const likesDialogRef = useRef();

    function handleLike() {
        likeHandler();
        setLikedByUser(!likedByUser);
        likedByUser ? setLikes(likes - 1) : setLikes(likes + 1);
    }

    return (
        <div className="sticky bottom-0 bg-white md:absolute md:w-full">
            <div className="pt-3 pl-4 pr-4 border-t-1 border-neutral-200">
                <span className="flex gap-2">
                    <button onClick={handleLike} className="size-6">
                        <img src={likedByUser ? heartActive : heart} />
                    </button>
                    <img src={comment} className="size-6" />
                    <img src={share} className="size-6" />
                    <img src={bookmark} className="size-6 ml-auto" />
                </span>
                <button onClick={() => likesDialogRef.current.showModal()} className="mt-2 font-semibold text-sm">
                    {likes} likes
                </button>
                <p className="mt-1 text-xs text-neutral-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            {children}
            <FollowDialog follows={post.likedBy} ref={likesDialogRef} user={user} label={"Likes"} />
        </div>
    );
}
