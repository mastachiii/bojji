const getUserTokens = require("./helpers/getUserTokens");
let request = require("supertest");

request = request("http://localhost:8080");

const postTest = () => {
    describe("Post test suite", () => {
        let mastachiiToken;
        let audreyToken;

        beforeAll(async () => {
            const tokens = await getUserTokens();

            mastachiiToken = tokens[0];
            audreyToken = tokens[1];
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

            it("Doesn't update if user is not author of post", async () => {
                await request.post(`/post/update/${postId}`).set("Authorization", `Bearer ${audreyToken}`).expect(403);
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

            it("Doesn't delete if user is not author of post", async () => {
                await request.post(`/post/delete/${postId}`).set("Authorization", `Bearer ${audreyToken}`).expect(403);

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { post } = response.body;

                        expect(post).toBeTruthy();
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

                        expect(post.likedBy).toHaveLength(1);
                    });
            });

            it("Dislike post", async () => {
                await request.post(`/post/${postId}/dislike`).set("Authorization", `Bearer ${audreyToken}`).expect(200);

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { post } = response.body;

                        expect(post.likedBy).toHaveLength(0);
                    });
            });
        });

        describe("When user comments on a post", () => {
            let postId;
            let commentId;

            beforeAll(async () => {
                await request
                    .post("/post/create")
                    .send({ body: "Another dummy post", images: ["IMAGE 1"] })
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { post } = response.body;

                        postId = post.id;
                    });
            });

            it("Can comment on post", async () => {
                await request
                    .post(`/post/${postId}/comment`)
                    .send({ body: "Great dummy post!" })
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(201)
                    .then(response => {
                        const { comment } = response.body;

                        commentId = comment.id;
                    });

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { post } = response.body;

                        expect(post.comments).toHaveLength(1);
                    });
            });

            it("Like a comment", async () => {
                await request.post(`/post/comment/${commentId}/like`).set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { post } = response.body;
                        const comment = post.comments.find(c => c.id === commentId);

                        expect(comment.likedBy).toHaveLength(1);
                    });
            });

            it("Dislike a comment", async () => {
                await request.post(`/post/comment/${commentId}/dislike`).set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { post } = response.body;
                        const comment = post.comments.find(c => c.id === commentId);

                        expect(comment.likedBy).toHaveLength(0);
                    });
            });

            it("Doesn't delete if user is not author of comment", async () => {
                await request.post(`/post/comment/${commentId}/delete`).set("Authorization", `Bearer ${mastachiiToken}`).expect(403);
            });

            it("Can delete comment", async () => {
                await request.post(`/post/comment/${commentId}/delete`).set("Authorization", `Bearer ${audreyToken}`).expect(200);

                await request
                    .get(`/post/${postId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { post } = response.body;

                        expect(post.comments).toHaveLength(0);
                    });
            });
        });

        describe("When user replies to a comment", () => {
            let postId;
            let commentId;
            let replyId;

            beforeAll(async () => {
                await request
                    .post("/post/create")
                    .send({ body: "Dummy post", images: ["somepic.comcom"] })
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .then(response => {
                        const { post } = response.body;

                        postId = post.id;
                    });

                await request
                    .post(`/post/${postId}/comment`)
                    .send({ body: "Whats a dummy post without a dummy comment?" })
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { comment } = response.body;

                        commentId = comment.id;
                    });
            });

            it("Creates a reply to a comment", async () => {
                await request
                    .post(`/post/comment/${commentId}/reply`)
                    .send({ body: "And whats a dummy comment without a dummy reply?" })
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(201)
                    .then(response => {
                        const { reply } = response.body;

                        replyId = reply.id;
                    });

                await request
                    .get(`/post/comment/${commentId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { comment } = response.body;

                        expect(comment.replies).toHaveLength(1);
                    });
            });

            it("Likes a reply", async () => {
                await request.post(`/post/comment/${commentId}/reply/${replyId}/like`).set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get(`/post/comment/${commentId}/reply/${replyId}`)
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .expect(200)
                    .then(response => {
                        const { reply } = response.body;

                        expect(reply.likedBy).toHaveLength(1);
                    });
            });

            it("Dislikes a reply", async () => {
                await request
                    .post(`/post/comment/${commentId}/reply/${replyId}/dislike`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200);

                await request
                    .get(`/post/comment/${commentId}/reply/${replyId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { reply } = response.body;

                        expect(reply.likedBy).toHaveLength(0);
                    });
            });

            it("Delete a reply", async () => {
                await request.post(`/post/comment/${commentId}/reply/${replyId}/delete`).set("Authorization", `Bearer ${mastachiiToken}`).expect(403);

                await request.post(`/post/comment/${commentId}/reply/${replyId}/delete`).set("Authorization", `Bearer ${audreyToken}`).expect(200);

                await request
                    .get(`/post/comment/${commentId}`)
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .expect(200)
                    .then(response => {
                        const { comment } = response.body;

                        expect(comment.replies).toHaveLength(0);
                    });
            });
        });
    });
};

module.exports = postTest;
