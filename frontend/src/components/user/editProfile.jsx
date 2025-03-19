import { useContext, useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import EditProfileField from "./editProfileField";
import userContext from "../context/userContext";
import cancel from "../../assets/cancel.svg";
import { RotatingLines } from "react-loader-spinner";

export default function EditProfile({ ref }) {
    let userData = useContext(userContext) || {};
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [status, setStatus] = useState("");

    function handleUpdate() {
        setStatus("UPDATING");
        userApi.updateProfile({ username, fullName, bio, profilePicture, statusHandler: setStatus });
    }

    useEffect(() => {
        setBio(userData.bio || "");
    }, [userData.bio]);

    return (
        <dialog ref={ref} className="min-w-screen min-h-screen md:min-w-[40%] md:min-h-[50%] md:m-auto md:rounded-md md:shadow-sm md:shadow-neutral-600">
            <span className="flex pt-2 pb-4 border-b-1 border-neutral-200">
                <p className="w-[100%] mt-1 font-semibold text-center">Edit Profile</p>
                <button onClick={() => ref.current.close()} className="absolute right-2 cursor-pointer">
                    <img src={cancel} className="size-8" />
                </button>
            </span>
            <div className="p-3">
                <div className="flex p-3 mt-5 items-center bg-neutral-200 rounded-xl">
                    <img src={profilePicture ? URL.createObjectURL(profilePicture) : userData.profilePicture} className="size-18 rounded-full" />
                    <span className="w-[40%] ml-4 text-md overflow-hidden">
                        <p className="font-semibold">{username || userData.username}</p>
                        <p className="text-sm text-neutral-600">{fullName || userData.fullName}</p>
                    </span>
                    <span className="ml-auto">
                        <label htmlFor="profilePicture" className="p-2 font-semibold text-white text-xs bg-sky-500 rounded-md cursor-pointer">
                            Change Photo
                        </label>
                        <input type="file" id="profilePicture" onChange={e => setProfilePicture(e.target.files[0])} className="hidden" />
                        <button className="ml-2 text-xs font-semibold cursor-pointer" onClick={() => setProfilePicture(null)}>
                            Reset
                        </button>
                    </span>
                </div>
                <div className="flex flex-col mt-10 ml-1 gap-3">
                    <EditProfileField value={username} handler={setUsername} label={"Username"} />
                    <EditProfileField value={fullName} handler={setFullName} label={"Full Name"} />
                    <div>
                        <h1 className="font-semibold text-sm">Bio</h1>
                        <div className="relative">
                            <textarea
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                className="w-full h-30 p-2 mt-2 text-md border-1 border-zinc-200 rounded-md resize-none outline-0"
                                maxLength={150}
                            ></textarea>
                            <p className="absolute right-2 bottom-2 text-xs text-neutral-700 font-semibold">{bio.length} / 150</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleUpdate}
                    disabled={status === "UPDATING"}
                    className="w-20 flex justify-center p-2 mt-15 ml-auto bg-sky-500 font-semibold text-sm text-white rounded-lg cursor-pointer"
                >
                    {status === "UPDATING" ? <RotatingLines width="20" strokeColor="white" /> : "Update"}
                </button>
            </div>
        </dialog>
    );
}
