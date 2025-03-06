export default function Form({ children, submitHandler, errors, label }) {
    console.log({ errors });
    return (
        <form onSubmit={submitHandler}>
            <div>
                <div>
                    {errors.map((e) => {
                        return <p key={e.path}>{e.msg}</p>;
                    })}
                </div>
                <h3>{label}</h3>
                {children}
            </div>
        </form>
    );
}
