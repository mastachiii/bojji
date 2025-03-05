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
                await request.post("/conversation/create").send({ receiverId: 2 }).set("Authorization", `Bearer ${audreyToken}`).expect(201);
            });
        });
    });
};
