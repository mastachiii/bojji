import { useState } from "react";
import FormField from "../auth/formField";

export default function EditProfile() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    return (
        <div>
            <FormField type={"text"} label={"Username:"} id={"username"} value={username} valueHandler={setUsername} />
            <FormField type={"text"} label={"Full name:"} id={"fullName"} value={fullName} valueHandler={setFullName} />
            <FormField type={"text"} label={"Bio:"} id={"bio"} value={bio} valueHandler={setBio} />
            <FormField type={"file"} label={"Profile picture:"} id={"profilePic"} value={profilePic} valueHandler={setProfilePic} />
        </div>
    );
}
