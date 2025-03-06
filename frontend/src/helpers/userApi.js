class User {
    constructor() {
        this.userUrl = "http://localhost:8080/user";
    }

    async signUp({ username, email, password, fullName }) {
        fetch(`${this.userUrl}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, fullName }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }
}

export default new User();
