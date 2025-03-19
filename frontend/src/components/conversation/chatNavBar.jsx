import { useContext } from "react";
import { Link } from "react-router";
import userContext from "../context/userContext";
import back from "../../assets/back.svg";
import createConvo from "../../assets/createConversation.svg";

export default function ChatNavBar({ chats, chatHandler }) {
    const user = useContext(userContext) || {};

    return (
        <div className="w-screen h-screen ">
            <div className="flex p-2 items-center">
                <Link to="/">
                    <img src={back} className="size-6" />
                </Link>
                <p className="ml-3 text-lg font-semibold">{user.username}</p>
                <button className="ml-auto">
                    <img src={createConvo} className="mt-1 size-6" />
                </button>
            </div>
            <div className="p-3 mt-5">
                <h1 className="text-md font-semibold">Messages</h1>
                <div className="flex flex-col gap-4 mt-3">
                    {chats && chats.length !== 0 ? (
                        chats.map(c => {
                            const latestMessage = c.messages[c.messages.length - 1];

                            return (
                                <div onClick={() => chatHandler(c)} className="flex">
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
        </div>
    );
}
