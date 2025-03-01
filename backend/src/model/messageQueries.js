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

(async () => {
    const db = new Message();

    await db.createMessage({ message: "Refactored", converastionId: "910bb476-4a83-4242-ba8a-2431493d0328", userId: 1 });

    const query = await prisma.conversation.findMany({
        include: {
            messages: true,
            users: true,
        },
    });

    console.dir(query, { depth: null });
})();
