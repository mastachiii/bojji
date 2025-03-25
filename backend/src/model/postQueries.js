const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Post {
    constructor() {
        this.selectFields = {
            id: true,
            username: true,
            profilePicture: true,
            followers: true,
        };
    }

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
            include: {
                likedBy: this.selectFields,
                comments: {
                    include: {
                        likedBy: this.selectFields,
                    },
                },
            },
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

    async getPostFeed({ userId }) {
        const posts = await prisma.post.findMany({
            where: {
                author: {
                    OR: [
                        { id: userId },
                        {
                            followers: {
                                some: {
                                    id: userId,
                                },
                            },
                        },
                    ],
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                likedBy: {
                    select: this.selectFields,
                },
                comments: {
                    include: {
                        author: {
                            select: this.selectFields,
                        },
                        likedBy: {
                            select: this.selectFields,
                        },
                        replies: {
                            include: {
                                author: {
                                    select: this.selectFields,
                                },
                                likedBy: {
                                    select: this.selectFields,
                                },
                            },
                        },
                    },
                },
                author: {
                    select: this.selectFields,
                },
            },
        });

        return posts;
    }

    async getSuggestedPosts({ userId }) {
        const posts = await prisma.post.findMany({
            where: {
                author: {
                    OR: [
                        {
                            id: {
                                not: userId,
                            },
                        },
                        {
                            followers: {
                                some: {
                                    id: {
                                        not: userId,
                                    },
                                },
                            },
                        },
                    ],
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                likedBy: {
                    select: this.selectFields,
                },
                comments: {
                    include: {
                        author: {
                            select: this.selectFields,
                        },
                        likedBy: {
                            select: this.selectFields,
                        },
                        replies: {
                            include: {
                                author: {
                                    select: this.selectFields,
                                },
                                likedBy: {
                                    select: this.selectFields,
                                },
                            },
                        },
                    },
                },
                author: {
                    select: this.selectFields,
                },
            },
        });

        return posts;
    }
}

module.exports = new Post();
