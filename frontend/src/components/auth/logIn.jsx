import user from "../../helpers/userApi";
import { useState } from "react";
import Form from "./form";
import FormField from "./formField";
import FormWrapper from "./formWrapper";

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
        <FormWrapper label={"Sign Up"} btnActiveStatus={status !== "LOGGING IN"} btnLabel={"Log In"}>
            <Form submitHandler={handleSubmit} errors={errors} label={""}>
                <FormField id={"username"} label={"Username"} type={"text"} value={username} valueHandler={setUsername} />
                <FormField id={"password"} label={"Password"} type={"password"} value={password} valueHandler={setPassword} />
            </Form>
        </FormWrapper>
    );
}
