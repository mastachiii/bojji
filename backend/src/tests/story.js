const { it } = require("date-fns/locale");
const getUserTokens = require("./helpers/getUserTokens");
let request = require("supertest");

request = request("http://localhost:8080");

const storyTest = () => {
    describe("Story test suite", () => {
        let mastachiiToken;
        let audreyToken;

        beforeAll(async () => {
            const tokens = await getUserTokens();

            mastachiiToken = tokens[0];
            audreyToken = tokens[1];
        });

        describe("Story CRUD Operations", () => {
            let storyId;

            it("Creates a story", async () => {
                await request
                    .post("/story/create")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .send({ image: "Some image" })
                    .expect(201)
                    .then(response => {
                        const { story } = response.body;

                        storyId = story.id;
                    });

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.stories).toHaveLength(1);
                    });
            });

            it("Deletes a story, throws if user is not author of story", async () => {
                await request.post(`/story/delete/${storyId}`).set("Authorization", `Bearer ${audreyToken}`).expect(403);

                await request.post(`/story/delete/${storyId}`).set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.stories).toHaveLength(0);
                    });
            });
        });

        describe("Like / Dislike story", () => {
            beforeAll(async () => {
                await request.post("/story/create").send({ image: "Some image" }).set("Authorization", `Bearer ${audreyToken}`);
            });

            it("Likes a post", async () => {
                await request.post('/')
            });
        });
    });
};

module.exports = storyTest;
