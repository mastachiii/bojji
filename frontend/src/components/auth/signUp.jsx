import user from "../../helpers/userApi";
import { useState } from "react";
import FormField from "./formField";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [fullName, setFullName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        user.signUp({ username, email, password, fullName });
    }

    return (
        <div>
            <form action="/">
                <h3>SIGN UP</h3>
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
            </form>
        </div>
    );
}
