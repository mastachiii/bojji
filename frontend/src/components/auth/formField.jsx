import PropTypes from "prop-types";
import { useState } from "react";

export default function FormField({ id, label, type, value, valueHandler }) {
    const [showField, setShowField] = useState(false);
    const inputType = type === "password" ? (showField ? "text" : "password") : type;

    return (
        <>
            <input type={inputType} value={value} onChange={e => valueHandler(e.target.value)} name={id} id={id} placeholder={label} />
            {type === "password" && <button type="button" onClick={() => setShowField(!showField)}>show pass</button>}
        </>
    );
}

FormField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    valueHandler: PropTypes.func,
};
