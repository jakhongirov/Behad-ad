const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { deviceId } = req.query
            const foundUser = await model.foundUser(deviceId)

            if (foundUser) {
                const foundAd = await model.foundAd(foundUser.user_age, foundUser.user_who, foundUser.user_country, foundUser.user_capital, foundUser.user_phone_lang)

                if (foundAd) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundAd
                    })
                } else {
                    const chooseAllAd = await model.chooseAllAd()

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: chooseAllAd.advertisement_link
                    })
                }
            } else {
                const chooseAllAd = await model.chooseAllAd()

                return res.json({
                    status: 200,
                    message: "Success",
                    data: chooseAllAd.advertisement_link
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    }
}