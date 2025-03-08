const getUserTokens = require("./helpers/getUserTokens");
let request = require("supertest");

request = request("http://localhost:8080");

const conversationTest = () => {
    describe("Conversation test suite", () => {
        let mastachiiToken;
        let audreyToken;
        let conversationId;

        beforeAll(async () => {
            const tokens = await getUserTokens();

            mastachiiToken = tokens[0];
            audreyToken = tokens[1];
        });

        let receiverId;
        describe("Conversation CRUD", () => {
            it("Creates a conversation", async () => {
                await request
                    .get("/user/mastachii")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
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
                    .get("/user/audreyHepburn123")
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.conversations).toHaveLength(1);
                    });
            });

            it("Removes a conversation", async () => {
                await request.post(`/conversation/${conversationId}/leave`).set("Authorization", `Bearer ${mastachiiToken}`);

                await request
                    .get("/user/mastachii")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.conversations).toHaveLength(0);
                    });
            });
        });

        describe("Conversation interactions", () => {
            let messageId;

            it("Sends messages to conversation", async () => {
                await request
                    .post(`/conversation/${conversationId}/message`)
                    .send({ message: "Hi!" })
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(201)
                    .then(response => {
                        const { message } = response.body;

                        messageId = message.id;
                    });

                await request
                    .get(`/conversation/${conversationId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { conversation } = response.body;

                        expect(conversation.messages).toHaveLength(1);
                    });
            });

            it("Removes messages from conversations", async () => {
                await request
                    .post(`/conversation/${conversationId}/message/${messageId}/delete`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(403);

                await request
                    .post(`/conversation/${conversationId}/message/${messageId}/delete`)
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(200);

                await request
                    .get(`/conversation/${conversationId}`)
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(200)
                    .then(response => {
                        const { conversation } = response.body;

                        expect(conversation.messages).toHaveLength(0);
                    });
            });
        });
    });
};

module.exports = conversationTest;
