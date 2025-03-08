import { Link } from "react-router";
import userApi from "../../helpers/userApi";
import { useState } from "react";

export default function Search() {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        userApi.searchForUsers({ filter, handler: setUsers });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
                <button>Search</button>
            </form>
            {users.map(u => {
                return <Link to={`/user/${u.id}`}>{u.username}</Link>;
            })}
        </div>
    );
}
