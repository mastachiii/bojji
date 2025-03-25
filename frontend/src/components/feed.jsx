import { useEffect, useState } from "react";
import postApi from "../helpers/postApi";
import PostPreview from "./post/postPreview";
import NavBar from "./navBar";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await postApi.getPostForFeed();

            setPosts(data);
        })();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="hidden">
                <NavBar />
            </div>
            <div className="flex flex-col gap-5">
                {posts.map(p => {
                    return <PostPreview post={p} />;
                })}
            </div>
            <div className="md:hidden">
                <NavBar />
            </div>
        </div>
    );
}
