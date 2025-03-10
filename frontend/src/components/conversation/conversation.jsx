import { useContext, useState } from "react";
import userApi from "../../helpers/userApi";
import conversationApi from "../../helpers/conversationApi";
import UserContext from "../context/userContext";
import { Link } from "react-router";

export default function Conversation() {
    const [usersToShow, setUsersToShow] = useState(null);
    const [filter, setFilter] = useState("");
    const userData = useContext(UserContext) || {};

    function handleSearch() {
        userApi.searchForUsers({ filter, handler: setUsersToShow });
    }

    function handleCreateConversation(id) {
        conversationApi.createConversation({ receiverId: id });
    }

    return (
        <div>
            <h4>Search for users</h4>
            <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
            <button onClick={handleSearch}>search</button>
            {usersToShow &&
                usersToShow.map(u => {
                    return (
                        <span>
                            <p>{u.username}</p>
                            <button onClick={() => handleCreateConversation(u.id)}>Create conversation</button>
                        </span>
                    );
                })}
            <h4>Messages</h4>
            {userData.conversations &&
                userData.conversations.map(c => {
                    return (
                        <div key={c.id}>
                            <Link to={`/chat/${c.id}`} state={{ conversation: c }}>
                                {c.users[0].username}
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}
