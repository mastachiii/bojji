import { RotatingLines } from "react-loader-spinner";

export default function ProfileButton({ handler, label, btnActive }) {
    return (
        <button
            onClick={handler}
            disabled={!btnActive}
            className="flex justify-center grow p-3 pt-1 pb-1 rounded-md text-xs font-semibold bg-neutral-200 cursor-pointer hover:bg-neutral-400"
        >
            {btnActive ? label : <RotatingLines strokeColor="black" width="15" />}
        </button>
    );
}
