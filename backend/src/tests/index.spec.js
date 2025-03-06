const userTest = require("./user");
const postTest = require("./post");
const storyTest = require("./story");
const conversationTest = require("./conversation");

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
        password: "mastachii0226",
        passwordConfirm: "mastachii0226",
        displayName: "audreyy",
        fullName: "Audrey Hepburn",
    });
});

// DB cleanup so that every test will start with a clean state.
afterAll(async () => {
    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.story.deleteMany();
    await prisma.reply.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
});

describe("User", userTest);
describe("Post", postTest);
describe("Story", storyTest);
describe("Conversation", conversationTest);
