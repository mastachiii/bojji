const userTest = require("./user");
const postTest = require("./post");
const storyTest = require("./story");
let request = require("supertest");
const { PrismaClient } = require("@prisma/client");

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
    await prisma.story.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
});

describe("User", userTest);
describe("Post", postTest);
describe("Story", storyTest);
