import { useContext, useState } from "react";
import FormField from "../auth/formField";
import userApi from "../../helpers/userApi";
import EditProfileField from "./editProfileField";
import userContext from "../context/userContext";

export default function EditProfile() {
    const userData = useContext(userContext) || {};
    const [username, setUsername] = useState(userData.username);
    const [fullName, setFullName] = useState(userData.fullName);
    const [bio, setBio] = useState(userData.bio);
    const [profilePicture, setProfilePicture] = useState(null);

    function handleUpdate() {
        userApi.updateProfile({ username, fullName, bio, profilePicture });
    }

    return (
        <div>
            <div>
                <h1>Profile picture</h1>
                <img src={profilePicture ? URL.createObjectURL(profilePicture) : userData.profilePicture} className="size-10" />
                <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
                <button onClick={() => setProfilePicture(null)}>clear</button>
            </div>
            <EditProfileField value={fullName} handler={setFullName} label={"Full Name:"} />
            <EditProfileField value={username} handler={setUsername} label={"Username:"} />
            <div>
                <h1>Bio</h1>
                <textarea value={bio} onChange={e => setBio(e.target.value)}></textarea>
            </div>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}
