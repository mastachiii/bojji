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

beforeAll(async () => {
    await request.post("/user/sign-up").send({
        username: "audreyHepburn123",
        email: "audreyHepburn123@gmail.com",
        password: "alsaliasid12",
        passwordConfirm: "alsaliasid12",
        displayName: "audreyy",
        fullName: "Audrey Hepburn",
    });
});

afterAll(async () => {
    await prisma.user.deleteMany();
});

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

describe("Following / Unfollowing users", () => {
    let mastachiiToken;
    let audreyToken;

    beforeAll(async () => {
        await request
            .post("/user/log-in")
            .send({
                username: "mastachii",
                password: "alsaliasid12",
            })
            .then(response => {
                mastachiiToken = response.body.token;
            });

        await request
            .post("/user/log-in")
            .send({
                username: "audreyHepburn123",
                password: "alsaliasid12",
            })
            .then(response => {
                audreyToken = response.body.token;
            });
    });

    it("Follows user", async done => {
        console.log({ mastachiiToken, audreyToken });

        await request.post("/user/follow/1").set("Authorization", `Bearer ${mastachiiToken}`).expect(200);

        await request
            .get("/user/2")
            .set("Authorization", `Bearer ${mastachiiToken}`)
            .then(response => {
                const { user } = response.body;

                expect(user.following).toBeTruthy();

                done();
            });

        await request
            .get("/user/1")
            .set("Authorization", `Bearer ${audreyToken}`)
            .then(response => {
                const { user } = response.body;

                expect(user.followers).toBeTruthy();

                done();
            });
    });

    it("Unfollows user", async done => {
        await request.post("/user/unfollow/1").set("Authorization", `Bearer ${mastachiiToken}`).expect(200, done);

        await request
            .get("/user/2")
            .set("Authorization", `Bearer ${mastachiiToken}`)
            .then(response => {
                const { user } = response.body;

                expect(user.following).toBeUndefined();

                done();
            });

        await request
            .get("/user/1")
            .set("Authorization", `Bearer ${audreyToken}`)
            .then(response => {
                const { user } = response.body;

                expect(user.followers).toBeUndefined();

                done();
            });
    });

    it("Throws if user tries to follow themself", () => {
        request.post("/user/follow/2").set("Authorization", `Bearer ${mastachiiToken}`).expect(400, done);
    });
});
