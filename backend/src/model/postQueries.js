const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Post {
    async createPost({ body, images, id }) {
        const post = await prisma.post.create({
            data: {
                body,
                images,
                author: {
                    connect: {
                        id,
                    },
                },
            },
        });

        return post;
    }

    async deletePost({ id }) {
        await prisma.post.delete({
            where: { id },
        });
    }

    async getPost({ id }) {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        return post;
    }

    async likePost({ id, userId }) {
        await prisma.post.update({
            where: { id },
            data: {
                likedBy: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async dislikePost({ id, userId }) {
        await prisma.post.update({
            where: { id },
            data: {
                likedBy: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async updatePost({ id, images, body }) {
        await prisma.post.update({
            where: { id },
            data: {
                body,
                images,
                edited: true,
                createdAt: new Date(),
            },
        });
    }
}

(async () => {
    const post = new Post();

    // await post.createPost({ body: "WILL THIS POST FAIL?", images: ["IMAGE 1", "IMAGE 2"], id: 1 });
    // await post.likePost({ id: "871b539e-7745-4c40-97d2-af641be4efaf", userId: 2 });
    // await post.updatePost({ id: "871b539e-7745-4c40-97d2-af641be4efaf", body: "IS THIS POST UPDATED?", images: ["IMAGE 1"] });

    const query = await prisma.user.findUnique({
        where: { id: 1 },
        include: {
            posts: {
                include: {
                    likedBy: true,
                },
            },
        },
    });

    // const query = await prisma.user.findMany()

    console.dir(query, { depth: null });
})();

module.exports = new Post();
