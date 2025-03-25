import { Link } from "react-router";
import CreatePost from "./post/createPost";
import { useContext, useRef } from "react";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import explore from "../assets/explore.svg";
import reels from "../assets/reels.svg";
import heart from "../assets/heart.svg";
import create from "../assets/create.svg";
import messenger from "../assets/messenger.svg";
import userContext from "./context/userContext";

function NavBarLink({ label, image, link, extraClass, size = "7" }) {
    return (
        <Link to={link} className="md:flex md:gap-4">
            <div className="md:size-9">
                <img src={image} className={`size-${size} ${extraClass} m-auto`} />
            </div>
            <p className="hidden md:block">{label}</p>
        </Link>
    );
}

export default function NavBar({ selected }) {
    const createPostRef = useRef();
    const user = useContext(userContext);

    return (
        <div className="w-full fixed bottom-0 flex items-center justify-center gap-7 p-2 bg-white border-t-1 border-r-1 border-neutral-200 md:h-screen md:sticky md:flex-col md:top-0 md:pt-10 md:pl-5 md:items-start md:justify-start">
            <h4 className="hidden mb-5 ml-2 font-[Pacifico] text-[1.6rem] md:block">Bojji</h4>
            <NavBarLink link={"/"} label={"Home"} image={home} size="8" />
            <NavBarLink link={"/search"} label={"Search"} image={search} size="8" />
            <NavBarLink link={"/explore"} label={"Explore"} image={explore} size="7" />
            <NavBarLink link={"/conversations"} label={"Messages"} image={messenger} size="9" />
            <button className="flex gap-4">
                <img src={heart} className="size-8 ml-[3px]" />
                <p className="hidden md:block">Notifications</p>
            </button>
            <button onClick={() => createPostRef.current.showModal()} className="flex gap-5 ml-[6px]">
                <img src={create} className="size-6" />
                <p className="hidden md:block">Create</p>
            </button>
            <NavBarLink link={`/user/${user.username}`} image={user.profilePicture} label="Profile" size="8" extraClass={"rounded-full"} />
            <CreatePost ref={createPostRef} />
        </div>
    );
}
