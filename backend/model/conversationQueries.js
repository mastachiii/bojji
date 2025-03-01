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
}

(async () => {
    const db = new Conversation();

    // await db.createConversation({ userIds: [1, 3] });

    const query = await prisma.conversation.findMany({
        include: {
            messages: true,
            users: true,
        },
    });

    console.dir(query, { depth: null });
})();
