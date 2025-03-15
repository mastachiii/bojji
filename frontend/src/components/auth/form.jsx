import PropTypes from "prop-types";

export default function Form({ children, submitHandler, errors, label }) {
    return (
        <form onSubmit={submitHandler} className="w-full h-full bg-amber-300">
            <div>
                <div>
                    {errors.map(e => {
                        return <p key={e.path}>{e.msg}</p>;
                    })}
                </div>
                <h3>{label}</h3>
                {children}
            </div>
        </form>
    );
}

Form.propTypes = {
    children: PropTypes.node,
    submitHandler: PropTypes.func,
    errors: PropTypes.array,
    label: PropTypes.string,
};
