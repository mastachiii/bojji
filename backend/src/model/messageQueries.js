const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Message {
    async createMessage({ converastionId, message, isImage = false, userId }) {
        await prisma.message.create({
            data: {
                message,
                isImage,
                conversation: {
                    connect: {
                        id: converastionId,
                    },
                },
                sender: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async deleteMessage({ id }) {
        await prisma.message.delete({
            where: { id },
        });
    }
}

module.exports = new Message();