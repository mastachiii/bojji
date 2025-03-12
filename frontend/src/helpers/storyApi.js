class Story {
    constructor() {
        this.storyUrl = "http://localhost:8080/story";
        this.token = localStorage.getItem("token");
    }

    async createStory({ image }) {
        try {
            const formData = new FormData();

            formData.append("image", image);

            await fetch(`${this.storyUrl}/create`, {
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

    async getStories({ userId }) {
        try {
            const stories = await fetch(`${this.storyUrl}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
                .then(response => response.json())
                .then(data => data.stories);

            return stories
        } catch {
            window.location.href = "/error";
        }
    }
}

export default new Story();
