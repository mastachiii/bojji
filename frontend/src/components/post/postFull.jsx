import { useContext, useState } from "react";
import commentApi from "../../helpers/commentApi";
import Comment from "../comment/comment";
import ImageCarousel from "./imageCarousel";
import userContext from "../context/userContext";
import { Link } from "react-router";
import userApi from "../../helpers/userApi";
import replyApi from "../../helpers/replyApi";
import PostInteract from "../post/postInteract";

export default function PostFull({ post, ref, likeHandler }) {
    const [comment, setComment] = useState("");
    const user = useContext(userContext) || {};
    const [isFollowing, setIsFollowing] = useState(post.author.followers.find(f => f.id === user.id));
    const [replyTo, setReplyTo] = useState(null);

    function handleComment() {
        if (!comment) return;

        post.comments.push({
            id: post.comments.length + 1,
            author: user,
            body: comment,
            likedBy: [],
            replies: [],
            createdAt: new Date(),
        });
        commentApi.createComment({ id: post.id, comment, authorId: post.author.id });
    }

    function handleReply() {
        const currentComment = comment.split(" ")[1];

        if (!currentComment) return;

        replyTo.replies.push({
            id: replyTo.replies.length + 1,
            author: user,
            body: currentComment,
            likedBy: [],
            replies: [],
            createdAt: new Date(),
        });

        replyApi.createReply({ id: replyTo.id, reply: currentComment });
    }

    function handleInteraction() {
        setIsFollowing(!isFollowing);
        userApi.interactWithUser({ username: post.author.username, type: isFollowing ? "unfollow" : "follow" });
    }

    function handleReplyTo({ user, comment }) {
        setReplyTo(comment);
        setComment(`@${user.username} `);
    }

    function handleCommentChange(e) {
        if (e.target.value === "") setReplyTo(null);

        setComment(e.target.value);
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
                    <p className="w-[80%] text-wrap text-sm">
                        <Link to={`/user/${post.author.username}`} className="font-semibold mr-1">
                            {post.author.username}
                        </Link>
                        {post.body}
                        <p className="mt-2 text-xs text-neutral-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </p>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    {post.comments.map(c => {
                        return <Comment comment={c} key={c.id} replyHandler={handleReplyTo} />;
                    })}
                </div>
            </div>
            <p>PSOT FULL</p>
            <button onClick={likeHandler}>like</button>
            <input type="text" value={comment} onChange={handleCommentChange} />
            <button onClick={replyTo ? handleReply : handleComment}>{replyTo ? "REPLY" : "COMMENT"}</button>
            <PostInteract post={post} likeHandler={likeHandler} />
        </dialog>
    );
}
