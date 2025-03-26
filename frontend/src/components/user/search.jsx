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

        value.length <= 2 ? setUsers([]) : userApi.searchForUsers({ filter, handler: setUsers });
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
            <div className="flex flex-col gap-3">
                {users.map(u => {
                    return (
                        <Link to={`/user/${u.username}`} className="flex gap-3 items-center pl-3">
                            <img src={u.profilePicture} className="size-12 rounded-full" />
                            <span className="text-sm">
                                <p className="font-semibold">{u.username}</p>
                                <p className="text-neutral-600">{u.fullName}</p>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
