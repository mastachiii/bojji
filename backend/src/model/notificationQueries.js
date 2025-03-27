const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Notification {
    async createNotification({ userId, postId, targetId, type }) {
        await prisma.notification.create({
            data: {
                type,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                post: {
                    connect: {
                        id: postId,
                    },
                },
                targetUser: {
                    connect: {
                        id: targetId,
                    },
                },
            },
        });
    }
}

module.exports = new Notification();
