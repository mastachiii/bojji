const request = require("supertest");

request = request("http://localhost:8080");

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
            })
            .expect(400)
            .then(response => {
                expect(response.body.errors.length).toBe(3);

                done();
            });
    });
});
