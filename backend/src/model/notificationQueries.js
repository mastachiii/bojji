const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Notification {
    async createNotification({ userId, postId, type }) {
        await prisma.notification.create({
            data: {
                type,
                user: {
                    connect: userId,
                },
                post: {
                    connect: postId,
                },
            },
        });
    }
}

export default new Notification();