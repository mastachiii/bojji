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

    async deleteConversation({ id }) {
        await prisma.conversation.delete({
            where: { id },
        });
    }
}

module.exports = new Conversation();
