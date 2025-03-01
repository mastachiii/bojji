const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Post {
    async createPost({ body, images, id }) {
        await prisma.post.create({
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
    }
}

(async () => {
    const post = new Post();

    // await post.createPost({ body: "WILL THIS POST FAIL?", images: ["IMAGE 1", "IMAGE 2"], id: 1 });

    const query = await prisma.user.findUnique({
        where: { id: 1 },
        include: {
            posts: true,
        },
    });

    console.dir(query, { depth: null });
})();
