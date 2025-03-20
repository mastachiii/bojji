import { Link } from "react-router";
import CreatePost from "./post/createPost";
import { useRef } from "react";

function NavBarButton({ label, image, link }) {
    return <Link to={link}> {label}</Link>;
}

export default function NavBar({ selected }) {
    const createPostRef = useRef();

    return (
        <div>
            <NavBarButton link={"/"} label={"Home"} />
            <NavBarButton link={"/search"} label={"Search"} />
            <NavBarButton link={"/explore"} label={"Explore"} />
            <NavBarButton link={"/reels"} label={"Reels"} />
            <NavBarButton link={"/conversations"} label={"Messages"} />
            <button>Notifications</button>
            <button onClick={() => createPostRef.current.showModal()}>Create</button>
            <CreatePost ref={createPostRef} />
        </div>
    );
}
