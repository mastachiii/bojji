import { useEffect, useState } from "react";
import postApi from "../../helpers/postApi";

export default function Explore() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const posts = postApi.getSuggestedPosts();

            setPosts(posts);
        })();
    });

    console.log(posts);
}
