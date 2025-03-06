import PropTypes from "prop-types";

export default function FormField({ id, label, type, value, valueHandler }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type} value={value} onChange={e => valueHandler(e.target.value)} name={id} id={id} />
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
