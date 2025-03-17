const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Notification {
    async createNotification({ userId, postId, targetId, type }) {
        await prisma.notification.create({
            data: {
                type,
                user: {
                    connect: userId,
                },
                post: {
                    connect: postId,
                },
                targetUser: {
                    connect: targetId,
                },
            },
        });
    }
}

module.exports = new Notification();
