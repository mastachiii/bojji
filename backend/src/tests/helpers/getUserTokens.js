let request = require("supertest");

request = request("http://localhost:8080");

async function getUserTokens() {
    let token1;
    let token2;

    await request
        .post("/user/log-in")
        .send({ username: "mastachii", password: "alsaliasid12" })
        .then(response => {
            token1 = response.body.token;
        });

    await request
        .post("/user/log-in")
        .send({ username: "audreyHepburn123", password: "alsaliasid12" })
        .then(response => {
            token2 = response.body.token;
        });

    return [token1, token2];
}

module.exports = getUserTokens;
