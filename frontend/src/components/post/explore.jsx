import { useEffect, useState } from "react";
import postApi from "../../helpers/postApi";
import NavBar from "../navBar";
import PostProfilePreview from "./postProfilePreview";

export default function Explore() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const posts = await postApi.getSuggestedPosts();

            setPosts(posts);
        })();
    }, []);

    console.log(posts);

    return (
        <div className="flex">
            <div className="md:w-[20%]">
                <NavBar />
            </div>
            <div className="w-full grid grid-cols-3 gap-1 ml-auto mr-auto mt-10 p-1 md:w-[50%]">
                {posts.map(p => {
                    console.log({ p });
                    return (
                        <div>
                            <PostProfilePreview post={p} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
