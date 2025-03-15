import user from "../../helpers/userApi";
import { Link } from "react-router";
import { useState } from "react";
import Form from "./form";
import FormField from "./formField";
import { RotatingLines } from "react-loader-spinner";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState("");
    const allFieldsFilled = username && password;

    function handleSubmit(e) {
        e.preventDefault();

        if (!allFieldsFilled) return;

        setStatus("LOGGING IN");
        user.logIn({ username, password, errorHandler: setErrors, statusHandler: setStatus });
    }

    return (
        <div className="w-full h-screen flex flex-col items-center gap-13 pt-[50%]  bg-stone-950 font-sans text-white">
            <h1 className="font-[Pacifico] text-[2.8rem] text-white">Bojji</h1>
            <Form submitHandler={handleSubmit} errors={errors} label={""}>
                <FormField id={"username"} label={"Username"} type={"text"} value={username} valueHandler={setUsername} />
                <FormField id={"password"} label={"Password"} type={"password"} value={password} valueHandler={setPassword} />
                <button
                    className="w-[80%] flex justify-center mt-2 p-2 bg-sky-500 rounded-md text-sm font-semibold cursor-pointer hover:bg-sky-800"
                    disabled={status === "LOGGING IN"}
                >
                    {status !== "LOGGING IN" ? "Log In" : <RotatingLines strokeColor="white" width="20" />}
                </button>
            </Form>
            <span className="w-full flex justify-center gap-1 p-5 mt-auto mb-2 text-xs border-t-1 border-zinc-500">
                <p>Don't have an account? </p>
                <Link to="/sign-up" className="text-sky-500 font-semibold">
                    Sign up
                </Link>
            </span>
        </div>
    );
}
