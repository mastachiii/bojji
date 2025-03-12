import { useNavigate } from "react-router";

const navigate = useNavigate();

class User {
    constructor() {
        this.userUrl = "http://localhost:8080/user";
        this.token = localStorage.getItem("token");
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
        } catch {
            navigate("/error");
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
                    if (data.error) return errorHandler([{ msg: data.error }]);

                    localStorage.setItem("token", data.token);

                    window.location.href = "/";
                });
        } catch {
            window.location.href = "/log-in";
        }
    }

    async searchForUsers({ filter, handler }) {
        try {
            await fetch(`${this.userUrl}/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({ search: filter }),
            })
                .then(response => response.json())
                .then(data => {
                    handler(data.search);
                });
        } catch {
            navigate("/error");
        }
    }

    async getUserData({ username }) {
        try {
            const user = await fetch(`${this.userUrl}/${username}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
                .then(response => response.json())
                .then(data => data.user);

            return user;
        } catch {
            navigate("/error");
        }
    }

    async followUser({ username }) {
        try {
            await fetch(`${this.userUrl}/follow/${username}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
        } catch {
            navigate("/error");
        }
    }
}

export default new User();
