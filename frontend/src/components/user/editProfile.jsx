import { useState } from "react";
import FormField from "../auth/formField";
import userApi from "../../helpers/userApi";

export default function EditProfile() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        userApi.updateProfile({ username, fullName, bio, profilePicture });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormField type={"text"} label={"Username:"} id={"username"} value={username} valueHandler={setUsername} />
                <FormField type={"text"} label={"Full name:"} id={"fullName"} value={fullName} valueHandler={setFullName} />
                <FormField type={"text"} label={"Bio:"} id={"bio"} value={bio} valueHandler={setBio} />
                <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
                <button>update</button>
            </form>
        </div>
    );
}
