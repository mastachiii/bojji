import { useLocation } from "react-router";
import { useState } from "react";

export default function Chat() {
    const conversation = useLocation().state.conversation;
    const [message, setMessage] = useState("");

    return (
        <div>
            <h3>{conversation.users[0].username}</h3>
            <textarea type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button>message</button>
        </div>
    );
}
