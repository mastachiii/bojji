import PropTypes from "prop-types";

export default function Form({ children, submitHandler, errors, label }) {
    return (
        <form onSubmit={submitHandler} className="w-full">
            <div>
                <h3>{label}</h3>
                <div className="flex flex-col items-center gap-3">{children}</div>
                <div>
                    {errors && (
                        <p className="w-[60%] text-center ml-auto mr-auto mt-4 text-sm text-red-400">
                            Sorry, your password incorrect. Please double-check your password.
                        </p>
                    )}
                </div>
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
