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
            it("Creates a story", async () => {
                await request.post("/story/create").set("Authorization", `Bearer ${mastachiiToken}`).send({ image: "Some image" }).expect(201);

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.stories).toHaveLength(1);
                    });
            });
        });
    });
};
