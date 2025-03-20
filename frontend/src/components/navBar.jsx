import { Link } from "react-router";

function NavBarButton({ label, image, link }) {
    return <Link to={link}> {label}</Link>;
}

export default function NavBar({ selected }) {
    return (
        <div>
            <NavBarButton link={"/"} label={"Home"} />
            <NavBarButton link={"/search"} label={"Search"} />
            <NavBarButton link={"/explore"} label={"Explore"} />
            <NavBarButton link={"/reels"} label={"Reels"} />
            <NavBarButton link={"/conversations"} label={"Messages"} />
            <button>Notifications</button>
            <button>Create</button>
        </div>
    );
}
