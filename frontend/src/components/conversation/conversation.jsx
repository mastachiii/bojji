import { useContext, useState } from "react";
import userApi from "../../helpers/userApi";
import conversationApi from "../../helpers/conversationApi";
import UserContext from "../context/userContext";
import ChatNavBar from "./chatNavBar";
import Chat from "./chat";

export default function Conversation() {
    const [usersToShow, setUsersToShow] = useState(null);
    const [filter, setFilter] = useState("");
    const [chatSelected, setChatSelected] = useState(null);
    const userData = useContext(UserContext) || {};

    function handleSearch() {
        userApi.searchForUsers({ filter, handler: setUsersToShow });
    }

    function handleCreateConversation(id) {
        conversationApi.createConversation({ receiverId: id });
    }

    return (
        <div>
            <div className={`${chatSelected && "hidden"}`}>
                <ChatNavBar chats={userData.conversations} chatHandler={setChatSelected} />
            </div>
            {chatSelected && <Chat chat={chatSelected} chatHandler={setChatSelected} />}
            {/* <h4>Search for users</h4>
            <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
            <h4>Messages</h4>
            <button onClick={handleSearch}>search</button>
            {usersToShow &&
                usersToShow.map(u => {
                    return (
                        <span>
                            <p>{u.username}</p>
                            <button onClick={() => handleCreateConversation(u.id)}>Create conversation</button>
                        </span>
                    );
                })} */}
        </div>
    );
}
