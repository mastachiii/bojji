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

    function handleSubmit(e, type) {
        e.preventDefault();

        if (!allFieldsFilled && type !== "guest") return;

        setStatus(type === "guest" ? "GUEST LOGGING IN" : "LOGGING IN");
        user.logIn({
            username: type === "guest" ? "guest" : username,
            password: type === "guest" ? "guestpassword123" : password,
            errorHandler: setErrors,
            statusHandler: setStatus,
        });
    }

    return (
        <>
            <FormWrapper label={"Sign Up"} btnStatus={status} btnLabel={"Log In"} btnHandler={handleSubmit} redirectLink={"/sign-up"} type={"logIn"}>
                <Form submitHandler={handleSubmit} error={errors} label={""}>
                    <FormField id={"username"} label={"Username"} type={"text"} value={username} valueHandler={setUsername} />
                    <FormField id={"password"} label={"Password"} type={"password"} value={password} valueHandler={setPassword} />
                </Form>
            </FormWrapper>
        </>
    );
}
