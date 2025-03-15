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
        <div>
            <h1>Bojji</h1>
            <Form submitHandler={handleSubmit} errors={errors} label={''}>
                <FormField id={"username"} label={"Username"} type={"text"} value={username} valueHandler={setUsername} />
                <FormField id={"password"} label={"Password"} type={"password"} value={password} valueHandler={setPassword} />
                <button>Log In</button>
            </Form>
        </div>
    );
}
