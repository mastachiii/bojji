import { useLocation } from "react-router";
import { useContext, useState } from "react";
import conversationApi from "../../helpers/conversationApi";
import UserContext from "../context/userContext";

export default function Chat() {
    const id = useLocation().state.conversation.id;
    const userData = useContext(UserContext);
    const conversation = userData && userData.conversations.find(c => c.id === id);
    const [message, setMessage] = useState("");

    function handleSend() {
        conversationApi.messageConversation({ id, message });
    }

    if (!conversation) return;

    return (
        <div>
            <h3>{conversation.users[0].username}</h3>
            {conversation.messages.map(m => {
                return <p>{m.message}</p>;
            })}
            <textarea type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={handleSend}>message</button>
        </div>
    );
}
