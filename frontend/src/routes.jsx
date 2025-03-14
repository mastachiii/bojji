import { createBrowserRouter } from "react-router";
import SignUp from "./components/auth/signUp.jsx";
import LogIn from "./components/auth/logIn.jsx";
import Search from "./components/user/search.jsx";
import Profile from "./components/user/profile.jsx";
import CreatePost from "./components/createPost.jsx";
import Feed from "./components/feed.jsx";
import Conversation from "./components/conversation/conversation.jsx";
import Chat from "./components/conversation/chat.jsx";
import Error from "./components/error.jsx";
import CreateStory from "./components/story/createStory.jsx";
import ViewStory from "./components/story/viewStory.jsx";
import EditProfile from "./components/user/editProfile.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Feed />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/log-in",
        element: <LogIn />,
    },
    {
        path: "/search",
        element: <Search />,
    },
    {
        path: "/user/edit",
        element: <EditProfile />,
    },
    {
        path: "/user/:username",
        element: <Profile />,
    },
    {
        path: "/post/create",
        element: <CreatePost />,
    },
    {
        path: "/conversation",
        element: <Conversation />,
    },
    {
        path: "/chat/:id",
        element: <Chat />,
    },
    {
        path: "/story/create",
        element: <CreateStory />,
    },
    {
        path: "/story/:id",
        element: <ViewStory />,
    },
    {
        path: "/error",
        element: <Error />,
    },
]);

export default routes;
