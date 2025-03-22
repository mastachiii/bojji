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
            <div className="flex gap-2 mt-2 ml-2">
                <img src={post.author.profilePicture} className="size-11 rounded-full" />
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
            <p>PSOT FULL</p>
            {post.comments.map(c => {
                return <Comment comment={c} key={c.id} />;
            })}
            <button onClick={likeHandler}>like</button>
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
            <button onClick={handleComment}>comment</button>
        </dialog>
    );
}
