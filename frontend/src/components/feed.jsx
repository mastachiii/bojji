import { useContext, useEffect, useState } from "react";
import postApi from "../helpers/postApi";
import { Link } from "react-router";
import UserContext from "./context/userContext";
import PostPreview from "./post/postPreview";
import NavBar from "./navBar";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const userData = useContext(UserContext);

    useEffect(() => {
        (async () => {
            const data = await postApi.getPostForFeed();

            setPosts(data);
        })();
    }, []);

    return (
        <div>
            {userData &&
                userData.following.map(f => {
                    if (f.stories.length === 0) return;

                    return (
                        <Link to={`/story/${f.id}`} key={f.id}>
                            {f.username}
                        </Link>
                    );
                })}
            { posts.map(p => {
                return <PostPreview post={p} />;
            })}
            <NavBar />
        </div>
    );
}
