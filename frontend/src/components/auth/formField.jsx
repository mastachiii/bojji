import PropTypes from "prop-types";
import { useState } from "react";

export default function FormField({ id, label, type, value, valueHandler }) {
    const [showField, setShowField] = useState(false);
    const inputType = type === "password" ? (showField ? "text" : "password") : type;

    return (
        <div className="w-[80%] rounded-md p-2 pb-3 border-bg-neutral-200 bg-stone-800">
            <p className={`mb-2 text-zinc-500 transition-opacity duration-100 ease-in ${value ? "opacity-100 text-[10px]" : "opacity-0 text-[0px]"}`}>{label}</p>
            <div className="flex justify-between">
                <input
                    type={inputType}
                    value={value}
                    onChange={e => valueHandler(e.target.value)}
                    name={id}
                    id={id}
                    placeholder={label}
                    className="w-[85%] mr-auto text-xs outline-0 "
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowField(!showField)}
                        className={`ml-auto text-xs font-semibold cursor-pointer ${value ? "block" : "hidden"}`}
                    >
                        {showField ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </div>
    );
}

FormField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    valueHandler: PropTypes.func,
};
