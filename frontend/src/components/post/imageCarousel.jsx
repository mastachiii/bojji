import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";
import { useState } from "react";

export default function ImageCarousel({ images }) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="w-fit h-140 relative flex justify-center ml-auto mr-auto mt-4">
            {selected > 0 && (
                <button onClick={() => setSelected(selected - 1)}>
                    <img src={prev} className="w-7 absolute left-1 bottom-60" />
                </button>
            )}
            {[...images].map((image, index) => {
                return <img src={URL.createObjectURL(image)} className={`w-sm animate-slide ${index === selected ? "block" : "hidden"}`} />;
            })}
            {selected < images.length - 1 && (
                <button onClick={() => setSelected(selected + 1)} className="w-7 absolute right-1 bottom-60">
                    {" "}
                    <img src={next} />
                </button>
            )}
            <div className="absolute bottom-10 flex gap-2">
                {[...images].map((e, index) => {
                    return <div className={`w-2 h-2 bg-neutral-500 rounded-full opacity-70 ${selected === index && "bg-white"}`}></div>;
                })}
            </div>
        </div>
    );
}
