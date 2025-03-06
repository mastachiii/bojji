export default function SignUp() {
    return (
        <div>
            <form action="/">
                <h3>SIGN UP</h3>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" name="fullName" id="fullName" />
                <button>Sign Up</button>
            </form>
        </div>
    );
}
