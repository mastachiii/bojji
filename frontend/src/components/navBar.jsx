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

function NavBarButton({ label, image, link, extraClass, size = "7" }) {
    return (
        <Link to={link}>
            <img src={image} className={`size-${size} ${extraClass}`} />
        </Link>
    );
}

export default function NavBar({ selected }) {
    const createPostRef = useRef();
    const user = useContext(userContext);

    return (
        <div className="w-full fixed bottom-0 flex items-center justify-center gap-7 p-2 bg-white border-t-1 border-neutral-200 md:sticky md:flex-col md:top-0 md:pt-8 pl-3">
            <h4 className="mb-5 font-[Pacifico] text-[1.6rem]">Bojji</h4>
            <NavBarButton link={"/"} label={"Home"} image={home} size="8" />
            <NavBarButton link={"/search"} label={"Search"} image={search} size="8" />
            <NavBarButton link={"/explore"} label={"Explore"} image={explore} size="7" />
            <NavBarButton link={"/conversations"} label={"Messages"} image={messenger} size="9" />
            <button>
                <img src={heart} className="size-8"/>
            </button>
            <button onClick={() => createPostRef.current.showModal()}>
                <img src={create} className="size-6" />
            </button>
            <NavBarButton link={`/user/${user.username}`} image={user.profilePicture} size="8" extraClass={"rounded-full"} />
            <CreatePost ref={createPostRef} />
        </div>
    );
}
