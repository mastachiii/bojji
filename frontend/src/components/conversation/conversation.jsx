import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import ChatNavBar from "./chatNavBar";
import Chat from "./chat";
import messenger from "../../assets/messenger.svg";

export default function Conversation() {
    const [chatSelected, setChatSelected] = useState(null);
    const userData = useContext(UserContext) || {};

    return (
        <div className="md:flex">
            <div className={`md:w-[35%] ${chatSelected && "hidden md:block"}`}>
                <ChatNavBar chats={userData.conversations} chatHandler={setChatSelected} />
            </div>
            {chatSelected ? (
                <Chat chat={chatSelected} chatHandler={setChatSelected} />
            ) : (
                <div className="hidden h-fit p-3 m-auto border-1 rounded-full md:block">
                    <img src={messenger} />
                </div>
            )}
        </div>
    );
}
