import { Link } from "react-router";
import CreatePost from "./post/createPost";
import { useRef } from "react";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import explore from "../assets/explore.svg";
import reels from "../assets/reels.svg";
import heart from "../assets/heart.svg";
import create from "../assets/create.svg";
import messenger from "../assets/messenger.svg";

function NavBarButton({ label, image, link }) {
    return (
        <Link to={link}>
            <img src={image} className="size-7" />
        </Link>
    );
}

export default function NavBar({ selected }) {
    const createPostRef = useRef();

    return (
        <div className="fixed bottom-0 flex bg-white">
            <NavBarButton link={"/"} label={"Home"} image={home} />
            <NavBarButton link={"/search"} label={"Search"} image={search} />
            <NavBarButton link={"/explore"} label={"Explore"} image={explore} />
            <NavBarButton link={"/reels"} label={"Reels"} image={reels} />
            <NavBarButton link={"/conversations"} label={"Messages"} image={messenger} />
            {/* <button>Notifications</button> */}
            <button onClick={() => createPostRef.current.showModal()}>
                <img src={create} className="size-7"/>
            </button>
            <CreatePost ref={createPostRef} />
        </div>
    );
}
