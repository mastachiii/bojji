import user from "../../helpers/userApi";
import { useState } from "react";
import Form from "./form";
import FormField from "./formField";
import FormWrapper from "./formWrapper";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [fullName, setFullName] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});
    const allFieldsFilled = username && email && password && passwordConfirm && fullName;

    function handleSubmit(e) {
        e.preventDefault();

        if (!allFieldsFilled) return;

        setStatus("SIGNING UP");
        user.signUp({ username, email, password, fullName, passwordConfirm, errorHandler: setErrors, statusHandler: setStatus });
    }

    return (
        <FormWrapper
            label={"Log In"}
            btnActiveStatus={status === "SIGNING UP"}
            btnLabel={"Sign Up"}
            btnHandler={handleSubmit}
            redirectLink={"/log-in"}
        >
            <Form submitHandler={handleSubmit} errors={errors}>
                <FormField id={"username"} label={"Username: "} type={"text"} value={username} valueHandler={setUsername} error={errors.username} />
                <FormField id={"email"} label={"Email: "} type={"email"} value={email} valueHandler={setEmail} error={errors.email} />
                <FormField id={"fullName"} label={"Full Name: "} type={"text"} value={fullName} valueHandler={setFullName} error={errors.fullName} />
                <FormField
                    id={"password"}
                    label={"Password: "}
                    type={"password"}
                    value={password}
                    valueHandler={setPassword}
                    error={errors.password}
                />
                <FormField
                    id={"passwordConfirm"}
                    label={"Confirm Password: "}
                    type={"password"}
                    value={passwordConfirm}
                    valueHandler={setPasswordConfirm}
                    error={errors.passwordConfirm}
                />
            </Form>
        </FormWrapper>
    );
}
