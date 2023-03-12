const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { type, deviceId, adId } = req.query
            const foundUser = await model.foundUser(deviceId)
            const app = await model.foundApp(adId)

            if (foundUser) {
                const foundAd = await model.foundAd(foundUser.user_age, foundUser.user_who, foundUser.user_country, foundUser.user_capital, foundUser.user_phone_lang, type,)

                if (foundAd) {
                    await model.addAction(app?.app_id, adId, foundAd?.campaign_id, foundUser.user_id)
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundAd
                    })
                } else {
                    const chooseAllAd = await model.chooseAllAd(type)

                    if (chooseAllAd) {
                        await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, foundUser.user_id)

                        return res.json({
                            status: 200,
                            message: "Success",
                            data: chooseAllAd
                        })
                    } else {
                        return res.json({
                            status: 404,
                            message: "Not found"
                        })
                    }

                }
            } else {
                const chooseAllAd = await model.chooseAllAd(type)

                if (chooseAllAd) {
                    await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, foundUser.user_id)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: chooseAllAd
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
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