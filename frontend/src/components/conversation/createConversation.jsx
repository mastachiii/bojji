import { useState } from "react";
import userApi from "../../helpers/userApi";
import conversationApi from "../../helpers/conversationApi";

export default function CreateConversation() {
    const [usersToShow, setUsersToShow] = useState(null);
    const [filter, setFilter] = useState("");

    function handleSearch() {
        userApi.searchForUsers({ filter, handler: setUsersToShow });
    }

    function handleCreateConversation(id) {
        conversationApi.createConversation({ receiverId: id });
    }

    return (
        <>
            {" "}
            <h4>Search for users</h4>
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
                })}
        </>
    );
}
