import { useState } from "react";
import FormField from "../auth/formField";
import userApi from "../../helpers/userApi";
import EditProfileField from "./editProfileField";

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
            <div>
                <h1>Profile picture</h1>
                <img src={profilePicture && URL.createObjectURL(profilePicture)} />
                <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
            </div>
            <EditProfileField value={fullName} handler={setFullName} label={"Full Name:"} />
            <EditProfileField value={bio} handler={setBio} label={"Bio:"} />
            <EditProfileField value={username} handler={setUsername} label={"Username:"} />
        </div>
    );
}
