const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Message {
    async createMessage({ conversationId, message, isImage = false, userId }) {
        const body = await prisma.message.create({
            data: {
                message,
                isImage,
                conversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                sender: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return body;
    }

    async deleteMessage({ id }) {
        await prisma.message.delete({
            where: { id },
        });
    }
}

module.exports = new Message();
