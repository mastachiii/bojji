const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient } = require("@prisma/client");

const primsa = new PrismaClient();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

const userStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await primsa.user.findUnique({
            where: { id: payload.user.id },
            include: {
                followers: true,
                following: true,
                posts: true,
                stories: true,
                comments: true,
                conversations: true,
                messages: true,
                commentReplies: true,
            },
        });
        if (!user) return done(null, false);

        return done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = userStrategy;
