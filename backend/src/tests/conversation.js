const getUserTokens = require("./helpers/getUserTokens");
let request = require("supertest");

request = request("http://localhost:8080");

const conversationTest = () => {
    describe("Conversation test suite", () => {
        let mastachiiToken;
        let audreyToken;

        beforeAll(async () => {
            const tokens = await getUserTokens();

            mastachiiToken = tokens[0];
            audreyToken = tokens[1];
        });

        describe("Conversation CRUD", () => {
            it("Creates a conversation", async () => {
                let receiverId;

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .then(response => {
                        const { user } = response.body;

                        receiverId = user.id;
                    });

                await request.post("/conversation/create").send({ receiverId }).set("Authorization", `Bearer ${audreyToken}`).expect(201);

                await request
                    .get("/user/1")
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.conversations).toHaveLength(1);
                    });
            });
        });
    });
};

module.exports = conversationTest;
