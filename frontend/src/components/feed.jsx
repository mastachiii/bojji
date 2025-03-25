import { useEffect, useRef, useState } from "react";
import postApi from "../helpers/postApi";
import PostPreview from "./post/postPreview";
import NavBar from "./navBar";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [suggestedPosts, setSuggestedPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await postApi.getPostForFeed();
            const suggestPosts = await postApi.getSuggestedPosts();

            setPosts(data);
            setSuggestedPosts(suggestPosts);
        })();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="hidden md:block md:w-[20%]">
                <NavBar />
            </div>
            <div className="flex flex-col md:w-[70%]">
                <div className="flex flex-col gap-5 items-center mt-5">
                    {posts.map(p => {
                        return <PostPreview post={p} />;
                    })}
                </div>
                <h4 className="mt-2 ml-4 text-lg font-semibold md:w-[40%] md:m-auto md:mt-2">Suggested Posts</h4>
                <div className="flex flex-col gap-5 items-center mt-5 pb-10">
                    {suggestedPosts.map(p => {
                        return <PostPreview post={p} />;
                    })}
                </div>
            </div>
            <div className="md:hidden">
                <NavBar />
            </div>
        </div>
    );
}
