import { useState } from "react";
import commentApi from "../../helpers/commentApi";
import Comment from "../comment/comment";

export default function PostFull({ post, ref, likeHandler }) {
    const [comment, setComment] = useState("");

    function handleComment() {
        commentApi.commentOnPost({ id: post.id, comment });
    }

    return (
        <dialog ref={ref}>
            {post.images.map(i => {
                return <img src={i} style={{ width: "100px" }} />;
            })}
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
