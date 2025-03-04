const getUserTokens = require("./helpers/getUserTokens");
let request = require("supertest");

request = request("http://localhost:8080");

const userTest = () => {
    describe("User test suite", () => {
        describe("Sign up", () => {
            it("Accepts if sign up is valid", done => {
                request
                    .post("/user/sign-up")
                    .send({
                        username: "mastachii",
                        email: "mastachii@gmail.com",
                        password: "alsaliasid12",
                        passwordConfirm: "alsaliasid12",
                        displayName: "mastachii",
                        fullName: "Al Asid",
                    })
                    .expect(201, done);
            });

            it("Rejects if sign up is invalid", done => {
                request
                    .post("/user/sign-up")
                    .send({
                        username: "mastachii",
                        email: "invalidemail@cc",
                        password: "invalidpassword123",
                        passwordConfirm: "invalidpasswordthatdoesnotmatch",
                        displayName: "mastachii",
                        fullName: "Al Asid",
                    })
                    .expect(400)
                    .then(response => {
                        expect(response.body.errors.length).toBe(3);

                        done();
                    });
            });
        });

        describe("Login", () => {
            it("Rejects invalid login form", done => {
                request
                    .post("/user/log-in")
                    .send({
                        username: "userThatDoesNotExist",
                        password: "nullnullnull",
                    })
                    .expect(401, done);
            });

            it("Accepts valid login form", done => {
                request
                    .post("/user/log-in")
                    .send({
                        username: "mastachii",
                        password: "alsaliasid12",
                    })
                    .expect(200)
                    .then(response => {
                        expect(response.body.token).toBeTruthy();

                        done();
                    });
            });
        });

        describe("Authentication", () => {
            let token;

            beforeAll(async () => {
                await request
                    .post("/user/log-in")
                    .send({
                        username: "mastachii",
                        password: "alsaliasid12",
                    })
                    .then(response => {
                        token = response.body.token;
                    });
            });

            it("Rejects if user does not provide a token", done => {
                request.get("/user/1").expect(401, done);
            });

            it("Accepts if token is valid", done => {
                request.get("/user/1").set("Authorization", `Bearer ${token}`).expect(200, done);
            });
        });

        describe("Following / Unfollowing users", () => {
            let mastachiiToken;
            let audreyToken;

            beforeAll(async () => {
                const tokens = await getUserTokens();

                mastachiiToken = tokens[0];
                audreyToken = tokens[1];
            });

            it("Follows user", async () => {
                await request.post("/user/follow/audreyHepburn123").set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.following).toBeTruthy();
                    });

                await request
                    .get("/user/1")
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.followers).toBeTruthy();
                    });
            });

            it("Unfollows user", async () => {
                await request.post("/user/unfollow/audreyHepburn123").set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

                await request
                    .get("/user/2")
                    .set("Authorization", `Bearer ${mastachiiToken}`)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.following).toHaveLength(0);
                    });

                await request
                    .get("/user/1")
                    .set("Authorization", `Bearer ${audreyToken}`)
                    .then(response => {
                        const { user } = response.body;

                        expect(user.followers).toHaveLength(0);
                    });
            });

            it("Throws if user tries to follow themselves", done => {
                request.post("/user/follow/mastachii").set("Authorization", `Bearer ${mastachiiToken}`).expect(400, done);
            });
        });
    });
};

module.exports = userTest;
