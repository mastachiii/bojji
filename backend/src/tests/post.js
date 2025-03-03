const { PrismaClient } = require("@prisma/client");
let request = require("supertest");

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

        describe("Post CRUD Operations", () => {
            let postId;

            it("Creates a post", async () => {
                await request
                    .post("/post/create")
                    .send({ body: "Posting from a test file!", images: ["somePic.imgur.com"] })
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(201)
                    .then(response => {
                        const { post } = response.body;

                        postId = post.id;
                    });

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.posts).toHaveLength(1);
                    });
            });

            it("Updates a post", async () => {
                await request
                    .post(`/post/update/${postId}`)
                    .send({ body: "Updated post!", images: ["someimage", "anotherimage"] })
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200);

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { post } = response.body;
                        expect(post.body).toEqual("Updated post!");
                        expect(post.images).toHaveLength(2);
                        expect(post.edited).toBeTruthy();
                    });
            });

            it("Delete a post", async () => {
                await request.post(`/post/delete/${postId}`).set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.posts).toHaveLength(0);
                    });
            });
        });

        describe("When user interacts with posts", () => {
            let postId;

            beforeAll(async () => {
                await request
                    .post("/post/create")
                    .send({ body: "Dummy post", images: ["image1", "image2"] })
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { post } = response.body;

                        postId = post.id;
                    });
            });

            it("Likes post", async () => {
                await request.post(`/post/${postId}/like`).set("Authorization", `Bearer ${audreyToken}`).expect(200);

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { post } = response.body;
                        console.log(post);
                        expect(post.likedBy).toHaveLength(1);
                    });
            });
        });
    });
};

module.exports = postTest;
