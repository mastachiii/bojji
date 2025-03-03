const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
let request = require("supertest");

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.TEST_DATABASE_URL,
        },
    },
});

request = request("http://localhost:8080");

const postTest = () => {
    describe("Post test suite", () => {
        let mastachiiToken;
        let audreyToken;

        beforeAll(async () => {
            await request
                .post("/user/log-in")
                .send({ username: "mastachii", password: "alsaliasid12" })
                .then(response => {
                    mastachiiToken = response.body.token;
                });

            await request
                .post("/user/log-in")
                .send({ username: "audreyHepburn123", password: "alsaliasid12" })
                .then(response => {
                    audreyToken = response.body.token;
                });
        });

        describe("Creates Post", () => {
            it("Creates a post", async () => {
                await request
                    .post("/post/create")
                    .send({ body: "Posting from a test file!", images: "somePic.imgur.com" })
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200);

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.posts).toHaveLength(1);
                    });
            });
        });
    });
};

module.exports = postTest;
