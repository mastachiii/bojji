import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";
import { useState } from "react";

export default function ImageCarousel({ images, height = "h-140", heightDesktop }) {
    const [selected, setSelected] = useState(0);
    const image = images[selected];
    const isString = typeof image === "string";

    return (
        <div className={`w-fit ${height} relative flex justify-center md:ml-auto md:mr-auto md:${heightDesktop} md:min-w-[50%]`}>
            {selected > 0 && (
                <button onClick={() => setSelected(selected - 1)}>
                    <img src={prev} className="w-7 absolute left-1 bottom-[40%] cursor-pointer" />
                </button>
            )}
            {<img src={isString ? image : URL.createObjectURL(image)} className={`w-screen md:h-full md:w-full`} />}
            {selected < images.length - 1 && (
                <button onClick={() => setSelected(selected + 1)} className="w-7 absolute right-1 bottom-[40%] cursor-pointer">
                    <img src={next} />
                </button>
            )}
            <div className="absolute bottom-[15%] flex gap-2">
                {images.length > 1 &&
                    [...images].map((e, index) => {
                        return <div className={`w-2 h-2 bg-neutral-500 rounded-full opacity-70 ${selected === index && "bg-white"}`}></div>;
                    })}
            </div>
        </div>
    );
}
