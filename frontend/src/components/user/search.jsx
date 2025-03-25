import { Link } from "react-router";
import userApi from "../../helpers/userApi";
import { useState } from "react";
import cancel from "../../assets/cancel.svg";
import SearchDialog from "../searchDialog";

export default function Search() {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    function handleChange(value) {
        setFilter(value);

        if (value.length < 2) return setUsers([]);

        userApi.searchForUsers({ filter, handler: setUsers });
    }

    return (
        <div>
            <span className="flex pt-2 pb-4 border-b-1 border-neutral-200">
                <p className="w-[100%] mt-1 font-semibold text-center">Search</p>
                <button onClick={null} className="absolute right-2 cursor-pointer">
                    <img src={cancel} className="size-8" />
                </button>
            </span>
            <SearchDialog value={filter} handler={handleChange} />
            {users.map(u => {
                return (
                    <div>
                        <img src={u.profilePicture} />
                        <p>{u.username}</p>
                        <p>{u.fullName}</p>
                    </div>
                );
            })}
        </div>
    );
}
