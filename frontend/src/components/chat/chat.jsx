import { useState } from "react";

export default function Chat() {
    const [usersToShow, setUsersToShow] = useState(null);
    
    return (
        <div>
            <h4>Search for users</h4>
            <input type="text" name="" id="" />
            <h4>Messages</h4>
        </div>
    );
}
