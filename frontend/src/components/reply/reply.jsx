import { useContext, useState } from "react";
import replyApi from "../../helpers/replyApi";
import userContext from "../context/userContext";

export default function Reply({ reply }) {
    const user = useContext(userContext);
    const [likes, setLikes] = useState(reply.likedBy.length);
    const [likedByUser, setLikedByUser] = useState(reply.likedBy.find(u => u.id === user.id));

    function handleInteraction() {
        replyApi.interactOnReply({ id: reply.id, type: likedByUser ? "dislike" : "like" });
        setLikedByUser(!likedByUser);
        setLikes(likedByUser ? likes - 1 : likes + 1);
    }

    console.log({ reply });
    return (
        <span>
            <p>{reply.author.username}</p>
            <p>{reply.body}</p>
            <p>{likes} - likes</p>
            <button onClick={handleInteraction}>like reply</button>
        </span>
    );
}
