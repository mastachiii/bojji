import { Link } from "react-router";
import CreatePost from "./post/createPost";
import { useContext, useRef } from "react";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import explore from "../assets/explore.svg";
import heart from "../assets/heart.svg";
import create from "../assets/create.svg";
import messenger from "../assets/messenger.svg";
import logout from "../assets/logOut.svg";
import userContext from "./context/userContext";
import Search from "./user/search";
import NavBarContext from "./context/navBarContext";
import Notification from "./notifications/notifications";
import userApi from "../helpers/userApi";

function NavBarLink({ label, image, link, extraClass, handler, size = "7" }) {
    const navBarContext = useContext(NavBarContext);

    return (
        <Link
            to={link}
            className="md:flex md:gap-4"
            onClick={e => {
                if (handler) {
                    e.preventDefault();
                    handler();
                }
            }}
        >
            <div className="md:size-9">
                <img src={image} className={`size-${size} ${extraClass} m-auto`} />
            </div>
            <p className={`${navBarContext ? "hidden" : "hidden md:block"}`}>{label}</p>
        </Link>
    );
}

export default function NavBar({ minimized, extraClass = "w-full" }) {
    const user = useContext(userContext) || {};
    const createPostRef = useRef();
    const searchUserRef = useRef();
    const notificationRef = useRef();

    return (
        <div
            className={`${extraClass} fixed bottom-0 flex items-center justify-center gap-7 p-2 bg-white border-t-1 border-r-1 border-neutral-200 md:h-screen md:sticky md:flex-col md:top-0 md:pt-10 md:pl-5 md:items-start md:justify-start`}
        >
            {!minimized && <h4 className="hidden mb-5 ml-2 font-[Pacifico] text-[1.6rem] md:block">Bojji</h4>}

            <NavBarContext.Provider value={minimized}>
                <NavBarLink link={"/"} label={"Home"} image={home} size="8" />
                <NavBarLink label={"Search"} image={search} size="8" handler={() => searchUserRef.current.showModal()} />
                <NavBarLink link={"/explore"} label={"Explore"} image={explore} size="7" />
                <NavBarLink link={"/conversation"} label={"Messages"} image={messenger} size="9" />
                <NavBarLink label={"Notifications"} image={heart} handler={() => notificationRef.current.showModal()} />
                <NavBarLink link={"/"} label={"Create"} image={create} handler={() => createPostRef.current.showModal()} size="6" />
                <NavBarLink link={`/user/${user.username}`} image={user.profilePicture} label="Profile" size="8" extraClass={"rounded-full"} />
                <div className="md:mt-auto md:mb-10">
                    <NavBarLink image={logout} label="Log out" size="6" handler={() => userApi.logOut()} />
                </div>
            </NavBarContext.Provider>
            <CreatePost ref={createPostRef} />
            <Search ref={searchUserRef} />
            <Notification ref={notificationRef} notifications={user.notifications} />
        </div>
    );
}
