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

    async getConversation({ id }) {
        const conversation = await prisma.conversation.findUnique({
            where: { id },
            include: {
                messages: {
                    orderBy: {
                        dateSent: "asc",
                    },
                },
            },
        });

        return conversation;
    }
}

module.exports = new Conversation();
