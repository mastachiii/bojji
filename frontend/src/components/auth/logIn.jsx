import user from "../../helpers/userApi";
import { useState } from "react";
import Form from "./form";
import FormField from "./formField";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        user.logIn({ username, password, errorHandler: setErrors });
    }

    return (
        <div className="w-full h-screen flex flex-col items-center gap-13 pt-[50%]  bg-stone-950 font-sans text-white">
            <h1 className="font-[Pacifico] text-[2.8rem] text-white">Bojji</h1>
            <Form submitHandler={handleSubmit} errors={errors} label={''}>
                <FormField id={"username"} label={"Username"} type={"text"} value={username} valueHandler={setUsername} />
                <FormField id={"password"} label={"Password"} type={"password"} value={password} valueHandler={setPassword} />
                <button className="w-[80%] mt-2 p-2 bg-sky-500 rounded-md text-sm font-semibold cursor-pointer">Log In</button>
            </Form>
        </div>
    );
}
