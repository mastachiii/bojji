import { useState } from "react";
import postApi from "../helpers/postApi";

export default function CreatePost({ ref }) {
    const [body, setBody] = useState("");
    const [images, setImages] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        postApi.createPost({ body, images });
    }

    console.log(images);

    return (
        <dialog ref={ref}>
            <h3>Create post</h3>
            {!images && (
                <form onSubmit={handleSubmit} encType="multiple/form-data">
                    <input type="file" multiple onChange={e => setImages(e.target.files)} accept="image/*" />
                </form>
            )}
            {images && (
                <>
                    {[...images].forEach(i => {
                        console.log(i)
                        <img src={URL.createObjectURL(i)} />
                    })}
                    <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
                    <button>create post</button>
                </>
            )}
        </dialog>
    );
}
