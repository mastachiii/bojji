import { useState } from "react";
import postApi from "../../helpers/postApi";
import cancel from "../../assets/cancel.svg";
import image from "../../assets/image.svg";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";

export default function CreatePost({ ref }) {
    const [body, setBody] = useState("");
    const [images, setImages] = useState(null);
    const [selected, setSelected] = useState(0);

    function handleCreatePost(e) {
        e.preventDefault();

        postApi.createPost({ body, images });
    }

    function handleSetImages(e) {
        const images = [...e.target.files].filter(f => f.type.split("/")[0] === "image");

        if (images.length === 0) return;

        setImages(images);
    }

    return (
        <dialog ref={ref} className="min-w-screen min-h-screen">
            <span className="relative flex items-center pt-2 pb-4 border-b-1 border-neutral-200">
                <h3 className="w-full mt-1 font-semibold text-center">Create post</h3>
                <button>
                    <img src={cancel} className="size-8 absolute right-1 top-1 mt-1" />
                </button>
            </span>
            {!images && (
                <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
                    <img src={image} className="size-15" />
                    <label htmlFor="image" className="p-1 pl-2 pr-2 font-semibold text-white bg-sky-500 rounded-md">
                        Upload photos
                    </label>
                    <input type="file" multiple onChange={handleSetImages} accept="image/*" id="image" className="hidden" />
                </div>
            )}
            {images && (
                <>
                    <div className="h-140 relative flex justify-center">
                        {selected > 0 && (
                            <button onClick={() => setSelected(selected - 1)}>
                                <img src={prev} className="w-7 absolute left-8 bottom-60" />
                            </button>
                        )}
                        {[...images].map((image, index) => {
                            return <img src={URL.createObjectURL(image)} className={`w-sm animate-slide ${index === selected ? "block" : "hidden"}`} />;
                        })}
                        {selected < images.length - 1 && (
                            <button onClick={() => setSelected(selected + 1)} className="w-7 absolute right-8 bottom-60">
                                {" "}
                                <img src={next} />
                            </button>
                        )}
                    </div>
                    <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
                    <button onClick={handleCreatePost}>create post</button>
                </>
            )}
        </dialog>
    );
}
