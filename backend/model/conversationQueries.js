const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Conversation {
    async createConversation({ userIds }) {
        await prisma.conversation.create({
            data: {
                users: {
                    connect: userIds.map(id => ({ id })),
                },
            },
        });
    }

    async addMessage({ id, message, isImage = false, userId }) {
        await prisma.conversation.update({
            where: { id },
            data: {
                messages: {
                    create: {
                        message,
                        isImage,
                        sender: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                },
            },
        });
    }
}

(async () => {
    const db = new Conversation();

    // await db.createConversation({ userIds: [1, 3] });
    await db.addMessage({
        message: "Hi there!",
        userId: 1,
        id: "910bb476-4a83-4242-ba8a-2431493d0328",
    });

    await db.addMessage({
        message: "Hello!",
        userId: 3,
        id: "910bb476-4a83-4242-ba8a-2431493d0328",
    });

    const query = await prisma.conversation.findMany({
        include: {
            messages: true,
            users: true,
        },
    });

    console.dir(query, { depth: null });
})();
