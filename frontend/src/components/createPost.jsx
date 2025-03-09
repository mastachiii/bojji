import { useState } from "react";
import postApi from "../helpers/postApi";

export default function CreatePost() {
    const [body, setBody] = useState("");
    const [images, setImages] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        postApi.createPost({ body, images });
    }

    return (
        <div>
            <h3>Create post</h3>
            <form onSubmit={handleSubmit} encType="multiple/form-data">
                <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
                <input type="file"  multiple onChange={e => setImages(e.target.files)} />
                <button>create post</button>
            </form>
        </div>
    );
}
