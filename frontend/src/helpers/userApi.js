class User {
    constructor() {
        this.userUrl = "http://localhost:8080/user";
    }

    async signUp({ username, email, password, passwordConfirm, fullName, errorHandler }) {
        try {
            fetch(`${this.userUrl}/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, fullName, passwordConfirm }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.errors) return errorHandler(data.errors);

                    // TODO: Redirect user to index page when sign up is successful.
                    window.location.href = "/log-in";
                });
        } catch (err) {
            // TODO: Make a error page.
        }
    }

    async logIn({ username, password, errorHandler }) {
        try {
            fetch(`${this.userUrl}/log-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.errors) return errorHandler(data.errors);

                    localStorage.setItem("token", response.body.token);
                    window.location.href = "/";
                });
        } catch (err) {
            window.location.href = "/log-in";
        }
    }
}

export default new User();
