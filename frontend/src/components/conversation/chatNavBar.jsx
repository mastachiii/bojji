import { useContext, useRef } from "react";
import { Link } from "react-router";
import userContext from "../context/userContext";
import back from "../../assets/back.svg";
import createConvo from "../../assets/createConversation.svg";
import CreateConversation from "./createConversation";

export default function ChatNavBar({ chats, chatHandler }) {
    const user = useContext(userContext) || {};
    const createConvoRef = useRef();

    return (
        <div className="w-screen h-screen md:text-lg md:w-full md:pt-8 md:pl-4 md:pr-4 md:border-r-1 md:border-neutral-300">
            <div className="flex p-2 items-center">
                <Link to="/">
                    <img src={back} className="size-6 md:hidden" />
                </Link>
                <p className="ml-3 text-lg font-bold md:text-2xl">{user.username}</p>
                <button onClick={() => createConvoRef.current.showModal()} className="ml-auto cursor-pointer">
                    <img src={createConvo} className="mt-1 size-6 md:mb-1" />
                </button>
            </div>
            <div className="p-3 mt-5">
                <h1 className="text-md font-semibold">Messages</h1>
                <div className="flex flex-col gap-5 mt-6">
                    {chats && chats.length !== 0 ? (
                        chats.map(c => {
                            const latestMessage = c.messages[c.messages.length - 1];

                            return (
                                <div key={c.id} onClick={() => chatHandler(c)} className="flex cursor-pointer md:text-sm">
                                    <img src={c.users[0].profilePicture} className="size-13 rounded-full" />
                                    <span className="ml-2">
                                        <p className="font-semibold">{c.users[0].username}</p>
                                        <p className="text-sm text-neutral-600">{latestMessage && latestMessage.message}</p>
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <p className="mt-30 text-lg text-center text-neutral-600 italic">You currently have no conversations</p>
                    )}
                </div>
            </div>
            <CreateConversation ref={createConvoRef} />
        </div>
    );
}
