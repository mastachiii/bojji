const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Conversation {
    async createConversation({ userIds }) {
        console.log({ userIds });

        await prisma.conversation.create({
            data: {
                users: {
                    connect: userIds.map(id => ({ id })),
                },
            },
        });
    }

    async removeConversation({ id, userId }) {
        await prisma.conversation.update({
            where: { id },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });
    }
}

module.exports = new Conversation();
