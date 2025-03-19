import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import ChatNavBar from "./chatNavBar";
import Chat from "./chat";

export default function Conversation() {
    const [chatSelected, setChatSelected] = useState(null);
    const userData = useContext(UserContext) || {};

    return (
        <div>
            <div className={`${chatSelected && "hidden md:block"}`}>
                <ChatNavBar chats={userData.conversations} chatHandler={setChatSelected} />
            </div>
            {chatSelected && <Chat chat={chatSelected} chatHandler={setChatSelected} />}
        </div>
    );
}
