import user from "../../helpers/userApi";
import { Link } from "react-router";
import { useState } from "react";
import Form from "./form";
import FormField from "./formField";
import { RotatingLines } from "react-loader-spinner";
import FormWrapper from "./formWrapper";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const allFieldsFilled = username && password;

    function handleSubmit(e) {
        e.preventDefault();

        if (!allFieldsFilled) return;

        setStatus("LOGGING IN");
        user.logIn({ username, password, errorHandler: setErrors, statusHandler: setStatus });
    }

    return (
        <FormWrapper
            label={"Sign Up"}
            btnActiveStatus={status === "LOGGING IN"}
            btnLabel={"Log In"}
            btnHandler={handleSubmit}
            redirectLink={"/sign-up"}
        >
            <Form submitHandler={handleSubmit} errors={errors} label={""}>
                <FormField id={"username"} label={"Username"} type={"text"} value={username} valueHandler={setUsername} />
                <FormField id={"password"} label={"Password"} type={"password"} value={password} valueHandler={setPassword} />
            </Form>
        </FormWrapper>
    );
}
