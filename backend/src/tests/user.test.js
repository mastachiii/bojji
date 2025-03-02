const { PrismaClient } = require("@prisma/client");
let request = require("supertest");

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.TEST_DATABASE_URL,
        },
    },
});

request = request("http://localhost:8080");

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
            .expect(200, done);
    });
});
