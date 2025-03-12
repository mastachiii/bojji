import { useState } from "react";
import postApi from "../../helpers/postApi";

export default function PostFull({ post, ref, likeHandler }) {
    const [comment, setComment] = useState("");

    function handleComment() {
        postApi.commentOnPost({ id: post.id, comment });
    }

    console.log(post);

    return (
        <dialog ref={ref}>
            {post.images.map(i => {
                return <img src={i} style={{ width: "100px" }} />;
            })}
            <p>PSOT FULL</p>
            {post.comments.map(c => {
                return <span>
                    <p>{c.author.username}</p>
                    <p>{c.body}</p>
                </span>;
            })}
            <button onClick={likeHandler}>like</button>
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
            <button onClick={handleComment}>comment</button>
        </dialog>
    );
}
