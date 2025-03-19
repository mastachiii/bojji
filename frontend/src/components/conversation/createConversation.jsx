import { useState } from "react";
import userApi from "../../helpers/userApi";
import conversationApi from "../../helpers/conversationApi";
import cancel from "../../assets/cancel.svg";

export default function CreateConversation({ ref }) {
    const [usersToShow, setUsersToShow] = useState(null);
    const [filter, setFilter] = useState("");

    function handleSearch() {
        if (filter.length < 2) return;

        userApi.searchForUsers({ filter, handler: setUsersToShow });
    }

    async function handleCreateConversation(id) {
        await conversationApi.createConversation({ receiverId: id });

        ref.current.close();
    }

    return (
        <dialog ref={ref} className="min-w-screen min-h-screen">
            <span className="relative flex items-center pt-2 pb-4 border-b-1 border-neutral-200">
                <h4 className="w-[100%] mt-1 font-semibold text-center">Search for users</h4>
                <button onClick={() => ref.current.close()} className="absolute top-2 right-1">
                    <img src={cancel} className="size-8"/>
                </button>
            </span>
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
        </dialog>
    );
}
