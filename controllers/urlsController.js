const db = require("../model");

// Defining methods for the booksController
module.exports = {
    getAllUrls: async function (req, res) {
        const allUrls = await db.User.findById(req.body.userId)
        .populate({
            path: "urls",
            model: db.ShortUrl,
            select: "full short clicks -_id",
        })
        .select("urls -_id")

        res.json({ allUrls: allUrls.urls })
    },
    newUrl: async function (req, res) {
        await db.ShortUrl.create({
            full: req.body.fullUrl,
        }).then((urlObj) => {
            db.User.findByIdAndUpdate(req.body.userId, {
                $push: {
                    urls: urlObj._id,
                },
            }).then(() => res.json(urlObj))
        })
    },
    shortUrl: async function (req, res) {
        const shortUrl = await db.ShortUrl.findOne({ short: req.params.shortUrl })
        if (shortUrl == null) return res.sendStatus(404)

        shortUrl.clicks++
        shortUrl.save()

        res.json({ fullUrl: shortUrl.full })
    }
}


