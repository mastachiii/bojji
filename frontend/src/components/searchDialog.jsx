import searchImg from "../assets/search.svg";
import clear from "../assets/clear.svg";

export default function SearchDialog({ value, handler }) {
    return (
        <div className="w-[95%] flex p-2 ml-auto mr-auto mt-3 mb-4 rounded-md bg-neutral-100">
            <button>
                <img src={searchImg} className="size-5" />
            </button>
            <input
                type="text"
                value={value}
                placeholder={"Search"}
                onChange={e => handler(e.target.value)}
                className="w-full ml-1 mr-1 text-[14px] outline-0"
            />
            <button onClick={() => handler("")}>
                <img src={clear} className="size-5 cursor-pointer" />
            </button>
        </div>
    );
}
