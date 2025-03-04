const db = require("../model/storyQueries");
const { addDays } = require("date-fns");

class Story {
    async createStory(req, res) {
        await db.createStory({ image: req.body.image, expiresAt: addDays(new Date(), 1), userId: req.user.id });

        res.sendStatus(201);
    }
}

module.exports = new Story();