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
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        user.signUp({ username, email, password, fullName, passwordConfirm, errorHandler: setErrors });
    }

    return (
        <FormWrapper>
            <Form submitHandler={handleSubmit} errors={errors} label={"SIGN UP"}>
                <FormField id={"username"} label={"Username: "} type={"text"} value={username} valueHandler={setUsername} />
                <FormField id={"email"} label={"Email: "} type={"email"} value={email} valueHandler={setEmail} />
                <FormField id={"fullName"} label={"Full Name: "} type={"text"} value={fullName} valueHandler={setFullName} />
                <FormField id={"password"} label={"Password: "} type={"password"} value={password} valueHandler={setPassword} />
                <FormField
                    id={"passwordConfirm"}
                    label={"Confirm Password: "}
                    type={"password"}
                    value={passwordConfirm}
                    valueHandler={setPasswordConfirm}
                />
                <button>Sign Up</button>
            </Form>
        </FormWrapper>
    );
}
