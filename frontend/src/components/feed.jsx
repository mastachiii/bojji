import { useEffect, useState } from "react";
import postApi from "../helpers/postApi";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await postApi.getPostForFeed();

            setPosts(data);
        })();
    }, []);

    return (
        <div>
            {posts.map(p => {
                return (
                    <div>
                        <h3>{p.body}</h3>
                        <div>
                            {p.images.map(i => {
                                return <img src={i} alt="post iamge" style={{width: '200px'}}/>
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
