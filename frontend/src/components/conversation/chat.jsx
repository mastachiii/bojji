import { useState } from "react";
import conversationApi from "../../helpers/conversationApi";
import UserContext from "../context/userContext";

export default function Chat({ chat }) {
    const [message, setMessage] = useState("");

    function handleSend() {
        conversationApi.messageConversation({ id: chat.id, message });
    }

    if (!chat) return;

    return (
        <div>
            <h3>{chat.users[0].username}</h3>
            {chat.messages.map(m => {
                return <p key={m.id}>{m.message}</p>;
            })}
            <textarea type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={handleSend}>message</button>
        </div>
    );
}
