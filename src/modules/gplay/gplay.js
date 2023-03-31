const gplay = require('google-play-scraper');

module.exports = {
    GET_GOOGLE_PLAY_APP: (req, res) => {
        try {
            const { packagename } = req.query

            if (packagename) {
                const gPlayResults = gplay.app({ appId: packagename });

                gPlayResults.then(function (result) {
                    res.json({
                        status: 200,
                        message: "Success",
                        data: result
                    })
                });


            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    }
}