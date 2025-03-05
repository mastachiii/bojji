const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkIfUsersHaveConversation({ userIds }) {
    const conversation = await prisma.user.findUnique({
        where: {
            id: userIds[0],
            conversations: {
                some: {
                    users: {
                        some: {
                            id: userIds[1],
                        },
                    },
                },
            },
        },
    });

    return conversation;
}

class Conversation {
    async createConversation({ userIds }) {
        const usersHaveConversation = await checkIfUsersHaveConversation({ userIds });

        if (usersHaveConversation) return;

        const conversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: userIds.map(id => ({ id })),
                },
            },
        });

        const test = await prisma.conversation.findMany();

        return conversation;
    }

    async leaveConversation({ id, userId }) {
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
