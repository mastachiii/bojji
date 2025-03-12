import { useState } from "react";
import storyApi from "../../helpers/storyApi";

export default function CreateStory() {
    const [image, setImage] = useState(null);

    function handleCreate() {
        storyApi.createStory({ image });
    }

    return (
        <div>
            <h3>Create Story</h3>
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <button onClick={handleCreate}>create story</button>
        </div>
    );
}
