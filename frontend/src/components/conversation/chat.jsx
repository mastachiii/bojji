import { useContext, useEffect, useState } from "react";
import conversationApi from "../../helpers/conversationApi";
import back from "../../assets/back.svg";
import userContext from "../context/userContext";
import send from "../../assets/send.svg";
import { RotatingLines } from "react-loader-spinner";

export default function Chat({ chat, chatHandler }) {
    const user = useContext(userContext);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [currentChat, setCurrentChat] = useState(chat);

    function handleSend() {
        setStatus("SENDING");
        setMessage("");
        conversationApi.messageConversation({ id: chat.id, message, statusHandler: setStatus });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentChat(user.conversations.find(c => c.id === chat.id));
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [chat.id, user.conversations]);

    if (!chat) return;

    return (
        <div className="w-screen h-screen relative overflow-y-hidden md:grow">
            <div className="flex items-center p-2 border-b-1 border-neutral-200">
                <button onClick={() => chatHandler(null)} className="size-8 md:hidden">
                    <img src={back} />
                </button>
                <span className="flex items-center gap-2 ml-4">
                    <img src={currentChat.users[0].profilePicture} className="size-9 rounded-full" />
                    <h3 className="font-semibold">{currentChat.users[0].username}</h3>
                </span>
            </div>
            <div className="min-h-[80%] max-h-[80%] mt-7 overflow-hidden overflow-y-scroll">
                {currentChat.messages.map(m => {
                    const isUser = m.sender.id === user.id;

                    return (
                        <p
                            key={m.id}
                            className={`w-fit max-w-[40%] p-3 mt-2 rounded-2xl ${
                                isUser ? "ml-auto mr-3 bg-sky-500 text-white" : "ml-3 bg-neutral-200"
                            }`}
                        >
                            {m.message}
                        </p>
                    );
                })}
            </div>
            <span className="absolute bottom-10 w-[95%] flex mt-auto ml-2 pl-2 pr-2 pt-1 pb-1 border-1 border-neutral-400 rounded-2xl">
                <textarea
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={1}
                    className="w-[88%] pt-2 pb-2 pl-1 outline-0 resize-none"
                />
                <button onClick={handleSend} disabled={status === "SENDING"} className="ml-auto">
                    {status === "SENDING" ? (
                        <RotatingLines width="20" strokeColor="grey" />
                    ) : (
                        <img src={send} className="p-2 size-8 bg-sky-500 rounded-full" />
                    )}
                </button>
            </span>
        </div>
    );
}
