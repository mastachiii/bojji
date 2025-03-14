import { useState } from "react";

export default function Reply({ reply }) {
    const [likes, setLikes] = useState(reply.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(reply.likedBy.find(u => u.id === user.id));

    return (
        <span>
            <p>{reply.author.username}</p>
            <p>{reply.body}</p>
            <p>{likes} - likes</p>
            <button>like reply</button>
        </span>
    );
}
