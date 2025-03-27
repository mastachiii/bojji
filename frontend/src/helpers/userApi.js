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
                .then(response => {
                    console.log({ response });
                    console.log(response.status);
                    if (response.status === 201) {
                        this.logIn({ username, password });
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data.errors) {
                        const errors = {};
                        statusHandler("");
                        data.errors.map(e => (errors[e.path] = e.msg));

                        return errorHandler(errors);
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
                    if (data.error) {
                        statusHandler && statusHandler("");

                        errorHandler && errorHandler([{ msg: data.error }]);
                    } else {
                        localStorage.setItem("token", data.token);

                        window.location.href = "/";
                    }
                });
        } catch {
            window.location.href = "/log-in";
        }
    }

    async logOut() {
        localStorage.removeItem("token");

        window.location.href = "/log-in";
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
                .then(response => {
                    const path = window.location.href.split("/");
                    const lastPath = path[path.length - 1];

                    if (response.status === 401 && lastPath !== "log-in" && lastPath !== "sign-up") return (window.location.href = "/log-in");

                    return response.json();
                })
                .then(data => data.user);

            return user;
        } catch {
            // window.location.href = '/error'
        }
    }

    async interactWithUser({ username, type, statusHandler }) {
        try {
            await fetch(`${this.userUrl}/${type}/${username}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            if (statusHandler) statusHandler("");
        } catch {
            window.location.href = "/error";
        }
    }

    async updateProfile({ username, fullName, bio, profilePicture, statusHandler }) {
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

            statusHandler("");
        } catch {
            window.location.href = "/error";
        }
    }
}

export default new User();
