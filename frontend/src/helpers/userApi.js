class User {
    constructor() {
        this.userUrl = "http://localhost:8080/user";
        this.token = localStorage.getItem("token");
    }

    async signUp({ username, email, password, passwordConfirm, fullName, errorHandler, statusHandler }) {
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
                    if (data.errors) {
                        const errors = {};
                        statusHandler("");
                        data.errors.map(e => (errors[e.path] = e.msg));

                        return errorHandler(errors);
                    } else {
                        this.logIn({ username, password });
                    }
                });
        } catch {
            window.location.href = "/error";
        }
    }

    async logIn({ username, password, errorHandler, statusHandler }) {
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
                    if (data.error.length !== 0) {
                        statusHandler("");

                        errorHandler([{ msg: data.error }]);
                    } else {
                        localStorage.setItem("token", data.token);

                        window.location.href = "/";
                    }
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
            window.location.href = "/error";
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
            // window.location.href = '/error'
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
            window.location.href = "/error";
        }
    }

    async updateProfile({ username, fullName, bio, profilePicture }) {
        try {
            const formData = new FormData();

            formData.append("username", username);
            formData.append("fullName", fullName);
            formData.append("bio", bio);
            formData.append("profilePicture", profilePicture);

            await fetch(`${this.userUrl}/update`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                body: formData,
            });
        } catch {
            window.location.href = "/error";
        }
    }
}

export default new User();
