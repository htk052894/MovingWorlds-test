const db = require("../model");
const validateNewUrl = require("../validation/shortcode");

// Defining methods for the urlsController
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
        const { errors, isValid } = validateNewUrl(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        await db.ShortUrl.findOne({ short: req.body.shortCode }).then((codeExist) => {
            if (codeExist) {
                errors.shortCode = "This ShortCode already used. Please try another one.";
                return res.status(400).json(errors)
            } else {
                db.ShortUrl.create({
                    full: req.body.fullUrl,
                    short: req.body.shortCode
                }).then((urlObj) => {
                    db.User.findByIdAndUpdate(req.body.userId, {
                        $push: {
                            urls: urlObj._id,
                        },
                    }).then(() => res.json(urlObj))
                })
            }
        });
    },
    generateShorCode: function (req, res) {
        db.ShortUrl.find({}).select("short").exec(function(err, codeList){
            var isGenerated = false;
            var result           = '';

            while (!isGenerated) {
                var result = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < 6; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                if (codeList.indexOf(result) < 0) {
                    isGenerated = true;
                }
            }
            
            res.json({ code: result })
        })        
    },
    shortUrl: async function (req, res) {
        const shortUrl = await db.ShortUrl.findOne({ short: req.params.shortUrl })
        if (shortUrl == null) return res.sendStatus(404)

        shortUrl.clicks++
        shortUrl.updatedAt = Date.now()
        shortUrl.save()

        res.json({ fullUrl: shortUrl.full })
    }
}


