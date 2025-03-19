import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import conversationApi from "../../helpers/conversationApi";
import cancel from "../../assets/cancel.svg";
import SearchDialog from "../searchDialog";

export default function CreateConversation({ ref }) {
    const [usersToShow, setUsersToShow] = useState(null);
    const [filter, setFilter] = useState("");

    async function handleCreateConversation(id) {
        await conversationApi.createConversation({ receiverId: id });

        ref.current.close();
    }

    useEffect(() => {
        if (filter.length < 2) return setUsersToShow(null);

        userApi.searchForUsers({ filter, handler: setUsersToShow });
    }, [filter]);

    return (
        <dialog ref={ref} className="min-w-screen min-h-screen shadow-md shadow-neutral-600 md:min-w-[30%] md:min-h-[70%] md:rounded-xl md:m-auto">
            <span className="relative flex items-center pt-2 pb-4 border-b-1 border-neutral-200">
                <h4 className="w-[100%] mt-1 font-semibold text-center">Create conversation</h4>
                <button onClick={() => ref.current.close()} className="absolute top-2 right-1 cursor-pointer">
                    <img src={cancel} className="size-8" />
                </button>
            </span>
            <SearchDialog value={filter} handler={setFilter} />
            <div className="p-3">
                {usersToShow &&
                    usersToShow.map(u => {
                        return (
                            <div onClick={() => handleCreateConversation(u.id)} className="flex gap-2 mb-3 cursor-pointer">
                                <img src={u.profilePicture} className="size-12 rounded-full md:size-14" />
                                <span className="md:text-sm">
                                    <p className="font-semibold">{u.username}</p>
                                    <p className="text-[11px] text-neutral-600">{u.fullName}</p>
                                </span>
                            </div>
                        );
                    })}
            </div>
        </dialog>
    );
}
