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
            let conversationId;

            it("Creates a conversation", async () => {
                let receiverId;

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .then(response => {
                        const { user } = response.body;

                        receiverId = user.id;
                    });

                await request
                    .post("/conversation/create")
                    .send({ receiverId })
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(201)
                    .then(response => {
                        const { conversation } = response.body;

                        conversationId = conversation.id;
                    });

                await request
                    .get("/user/1")
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;
                        console.dir({ user }, { depth: null });

                        expect(user.conversations).toHaveLength(1);
                    });
            });

            it("Removes a conversation", async () => {
                await request.post(`/conversation/${conversationId}/leave`).set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;
                        console.log({ user });
                        expect(user.conversations).toHaveLength(0);
                    });
            });
        });
    });
};

module.exports = conversationTest;
