import { useContext, useState } from "react";
import commentApi from "../../helpers/commentApi";
import Comment from "../comment/comment";
import ImageCarousel from "./imageCarousel";
import userContext from "../context/userContext";
import { Link } from "react-router";
import userApi from "../../helpers/userApi";

export default function PostFull({ post, ref, likeHandler }) {
    const [comment, setComment] = useState("");
    const user = useContext(userContext);
    const [isFollowing, setIsFollowing] = useState(post.author.followers.find(f => f.id === user.id));

    function handleComment() {
        commentApi.createComment({ id: post.id, comment, authorId: post.author.id });
    }

    function handleInteraction() {
        setIsFollowing(!isFollowing);
        userApi.interactWithUser({ username: post.author.username, type: isFollowing ? "unfollow" : "follow" });
    }

    return (
        <dialog ref={ref} className="min-w-screen min-h-screen">
            <ImageCarousel images={post.images} />
            <div className="flex gap-2 pt-2 pl-2 pb-2 border-b-1 border-neutral-300">
                <Link to={`/user/${post.author.username}`}>
                    <img src={post.author.profilePicture} className="size-10 rounded-full" />
                </Link>
                <span className="flex items-center gap-2">
                    <Link to={`/user/${post.author.username}`} className="font-semibold">
                        {post.author.username}
                    </Link>
                    <div className="w-[2px] h-[2px] mt-1 bg-black rounded-full"></div>
                    {user.id !== post.author.id && (
                        <button onClick={handleInteraction} className={`font-semibold text-sm ${!isFollowing && "text-sky-700"}`}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </span>
            </div>
            <div className="pl-2 pt-2">
                <div className="flex">
                    <Link to={`/user/${post.author.username}`} className="mr-2">
                        <img src={post.author.profilePicture} className="size-10 rounded-full" />
                    </Link>
                    <p className="w-[80%] text-wrap">
                        <Link to={`/user/${post.author.username}`} className="font-semibold mr-1">
                            {post.author.username}
                        </Link>
                        {post.body}
                        <p className="mt-2 text-xs text-neutral-600">{new Date().toLocaleDateString()}</p>
                    </p>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    {post.comments.map(c => {
                        return <Comment comment={c} key={c.id} />;
                    })}
                </div>
            </div>
            <p>PSOT FULL</p>
            <button onClick={likeHandler}>like</button>
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
            <button onClick={handleComment}>comment</button>
        </dialog>
    );
}
