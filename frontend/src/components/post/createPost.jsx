import { useContext, useState } from "react";
import postApi from "../../helpers/postApi";
import cancel from "../../assets/cancel.svg";
import image from "../../assets/image.svg";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";
import back from "../../assets/back.svg";
import userContext from "../context/userContext";
import { RotatingLines } from "react-loader-spinner";
import posted from "../../assets/posted.svg";

export default function CreatePost({ ref }) {
    const user = useContext(userContext) || {};
    const [body, setBody] = useState("");
    const [images, setImages] = useState(null);
    const [selected, setSelected] = useState(0);
    const [status, setStatus] = useState("");

    function handleCreatePost(e) {
        e.preventDefault();

        setStatus("POSTING");
        postApi.createPost({ body, images, statusHandler: setStatus, ref });
    }

    function handleSetImages(e) {
        const images = [...e.target.files].filter(f => f.type.split("/")[0] === "image");

        if (images.length === 0) return;

        setImages(images);
    }

    function handleClose() {
        setImages(null);
        setSelected(0);
        setStatus("");

        ref.current.close();
    }

    return (
        <dialog ref={ref} className="min-w-screen min-h-screen md:min-w-[40%] md:min-h-[50%] md:m-auto md:rounded-lg md:overflow-hidden">
            <span className="relative flex items-center pt-2 pb-4 border-b-1 border-neutral-200">
                {images && (
                    <button onClick={() => setImages(null)}>
                        <img src={back} className="size-6 absolute left-2 top-1 mt-2 cursor-pointer" />
                    </button>
                )}
                <h3 className="w-full mt-1 font-semibold text-center">Create post</h3>
                <button onClick={handleClose}>
                    <img src={cancel} className="size-8 absolute right-1 top-1 mt-1 cursor-pointer" />
                </button>
            </span>
            {status === "POSTED" && (
                <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
                    <img src={posted} className="size-17" />
                    <p className="font-semibold">Your post has been shared!</p>
                </div>
            )}
            {!images && status !== "POSTED" && (
                <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
                    <img src={image} className="size-15" />
                    <label htmlFor="image" className="p-1 pl-2 pr-2 font-semibold text-white bg-sky-500 rounded-md cursor-pointer hover:bg-sky-700">
                        Upload photos
                    </label>
                    <input type="file" multiple onChange={handleSetImages} accept="image/*" id="image" className="hidden" />
                </div>
            )}
            {images && status !== "POSTED" && (
                <>
                    <div className="w-fit h-140 relative flex justify-center ml-auto mr-auto mt-4">
                        {selected > 0 && (
                            <button onClick={() => setSelected(selected - 1)}>
                                <img src={prev} className="w-7 absolute left-1 bottom-60" />
                            </button>
                        )}
                        {[...images].map((image, index) => {
                            return (
                                <img src={URL.createObjectURL(image)} className={`w-sm animate-slide ${index === selected ? "block" : "hidden"}`} />
                            );
                        })}
                        {selected < images.length - 1 && (
                            <button onClick={() => setSelected(selected + 1)} className="w-7 absolute right-1 bottom-60">
                                {" "}
                                <img src={next} />
                            </button>
                        )}
                    </div>
                    <div className="mt-4 p-3">
                        <span className="flex items-center gap-2">
                            <img src={user.profilePicture} className="size-8 rounded-full" />
                            <p className="text-xs font-semibold">{user.username}</p>
                        </span>
                        <div className="p-2 flex flex-col">
                            <textarea
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                rows={5}
                                maxLength={500}
                                className="w-full p-2 text-sm outline-0 resize-none border-1 border-neutral-200"
                            ></textarea>
                            <button
                                onClick={handleCreatePost}
                                disabled={status === "POSTING"}
                                className="p-2 ml-auto mt-2 text-sm text-white font-semibold bg-sky-500 rounded-md cursor-pointer hover:bg-sky-700"
                            >
                                {status === "POSTING" ? <RotatingLines width="15" strokeColor="white" /> : "Share"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </dialog>
    );
}
