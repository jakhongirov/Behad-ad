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
                    if (foundAd.type_of_campaign.toLowerCase() === 'view') {
                        let result = 0

                        if (foundAd.view && foundAd.view.length > 0) {
                            for (let i = 0; i < foundAd.view.length; i++) {
                                result += foundAd.view[i].count;
                            }
                        }

                        if (result < foundAd.advertisement_limit) {
                            await model.addAction(app?.app_id, adId, foundAd?.campaign_id, deviceId)
                            return res.json({
                                status: 200,
                                message: "Success",
                                data: {
                                    campaign_id: foundAd.campaign_id,
                                    advertisement_media_type: foundAd.advertisement_media_type,
                                    advertisement_link: foundAd.advertisement_link,
                                    advertisement_title: foundAd.advertisement_title,
                                    advertisement_description: foundAd.advertisement_description,
                                    advertisement_action_text: foundAd.advertisement_action_text
                                }
                            })
                        } else {
                            await model.updateStatusAd(foundAd.campaign_id)
                            return res.json({
                                status: 204,
                                message: "No Content"
                            })
                        }
                    } else if (foundAd.type_of_campaign.toLowerCase() === 'click') {
                        let result = 0

                        if (foundAd.click && foundAd.click.length > 0) {
                            for (let i = 0; i < foundAd.click.length; i++) {
                                result += foundAd.click[i].count;
                            }
                        }

                        if (result < foundAd.advertisement_limit) {
                            await model.addAction(app?.app_id, adId, foundAd?.campaign_id, deviceId)
                            return res.json({
                                status: 200,
                                message: "Success",
                                data: {
                                    campaign_id: foundAd.campaign_id,
                                    advertisement_media_type: foundAd.advertisement_media_type,
                                    advertisement_link: foundAd.advertisement_link,
                                    advertisement_title: foundAd.advertisement_title,
                                    advertisement_description: foundAd.advertisement_description,
                                    advertisement_action_text: foundAd.advertisement_action_text
                                }
                            })
                        } else {
                            await model.updateStatusAd(foundAd.campaign_id)
                            return res.json({
                                status: 204,
                                message: "No Content"
                            })
                        }
                    } else if (foundAd.type_of_campaign.toLowerCase() === 'fullView') {
                        let result = 0

                        if (foundAd.full_view && foundAd.full_view.length > 0) {
                            for (let i = 0; i < foundAd.full_view.length; i++) {
                                result += foundAd.full_view[i].count;
                            }
                        }

                        if (result < foundAd.advertisement_limit) {
                            await model.addAction(app?.app_id, adId, foundAd?.campaign_id, deviceId)
                            return res.json({
                                status: 200,
                                message: "Success",
                                data: {
                                    campaign_id: foundAd.campaign_id,
                                    advertisement_media_type: foundAd.advertisement_media_type,
                                    advertisement_link: foundAd.advertisement_link,
                                    advertisement_title: foundAd.advertisement_title,
                                    advertisement_description: foundAd.advertisement_description,
                                    advertisement_action_text: foundAd.advertisement_action_text
                                }
                            })
                        } else {
                            await model.updateStatusAd(foundAd.campaign_id)
                            return res.json({
                                status: 204,
                                message: "No Content"
                            })
                        }
                    }
                } else {
                    const chooseAllAd = await model.chooseAllAd(type)

                    if (chooseAllAd.type_of_campaign.toLowerCase() === 'view') {
                        let result = 0

                        if (chooseAllAd.view && chooseAllAd.view.length > 0) {
                            for (let i = 0; i < chooseAllAd.view.length; i++) {
                                result += chooseAllAd.view[i].count;
                            }
                        }

                        if (result < chooseAllAd.advertisement_limit) {
                            await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, deviceId)
                            return res.json({
                                status: 200,
                                message: "Success",
                                data: {
                                    campaign_id: chooseAllAd.campaign_id,
                                    advertisement_media_type: chooseAllAd.advertisement_media_type,
                                    advertisement_link: chooseAllAd.advertisement_link,
                                    advertisement_title: chooseAllAd.advertisement_title,
                                    advertisement_description: chooseAllAd.advertisement_description,
                                    advertisement_action_text: chooseAllAd.advertisement_action_text
                                }
                            })
                        } else {
                            await model.updateStatusAd(chooseAllAd.campaign_id)
                            return res.json({
                                status: 204,
                                message: "No Content"
                            })
                        }
                    } else if (chooseAllAd.type_of_campaign.toLowerCase() === 'click') {
                        let result = 0

                        if (chooseAllAd.click && chooseAllAd.click.length > 0) {
                            for (let i = 0; i < chooseAllAd.click.length; i++) {
                                result += chooseAllAd.click[i].count;
                            }
                        }

                        if (result < chooseAllAd.advertisement_limit) {
                            await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, deviceId)
                            return res.json({
                                status: 200,
                                message: "Success",
                                data: {
                                    campaign_id: chooseAllAd.campaign_id,
                                    advertisement_media_type: chooseAllAd.advertisement_media_type,
                                    advertisement_link: chooseAllAd.advertisement_link,
                                    advertisement_title: chooseAllAd.advertisement_title,
                                    advertisement_description: chooseAllAd.advertisement_description,
                                    advertisement_action_text: chooseAllAd.advertisement_action_text
                                }
                            })
                        } else {
                            await model.updateStatusAd(chooseAllAd.campaign_id)
                            return res.json({
                                status: 204,
                                message: "No Content"
                            })
                        }
                    } else if (chooseAllAd.type_of_campaign.toLowerCase() === 'fullView') {
                        let result = 0

                        if (chooseAllAd.full_view && chooseAllAd.full_view.length > 0) {
                            for (let i = 0; i < chooseAllAd.full_view.length; i++) {
                                result += chooseAllAd.full_view[i].count;
                            }
                        }

                        if (result < chooseAllAd.advertisement_limit) {
                            await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, deviceId)
                            return res.json({
                                status: 200,
                                message: "Success",
                                data: {
                                    campaign_id: chooseAllAd.campaign_id,
                                    advertisement_media_type: chooseAllAd.advertisement_media_type,
                                    advertisement_link: chooseAllAd.advertisement_link,
                                    advertisement_title: chooseAllAd.advertisement_title,
                                    advertisement_description: chooseAllAd.advertisement_description,
                                    advertisement_action_text: chooseAllAd.advertisement_action_text
                                }
                            })
                        } else {
                            await model.updateStatusAd(chooseAllAd.campaign_id)
                            return res.json({
                                status: 204,
                                message: "No Content"
                            })
                        }
                    }
                }
            } else {
                const chooseAllAd = await model.chooseAllAd(type)

                if (chooseAllAd.type_of_campaign.toLowerCase() === 'view') {
                    let result = 0

                    if (chooseAllAd.view && chooseAllAd.view.length > 0) {
                        for (let i = 0; i < chooseAllAd.view.length; i++) {
                            result += chooseAllAd.view[i].count;
                        }
                    }

                    if (result < chooseAllAd.advertisement_limit) {
                        await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, deviceId)
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: {
                                campaign_id: chooseAllAd.campaign_id,
                                advertisement_media_type: chooseAllAd.advertisement_media_type,
                                advertisement_link: chooseAllAd.advertisement_link,
                                advertisement_title: chooseAllAd.advertisement_title,
                                advertisement_description: chooseAllAd.advertisement_description,
                                advertisement_action_text: chooseAllAd.advertisement_action_text
                            }
                        })
                    } else {
                        await model.updateStatusAd(chooseAllAd.campaign_id)
                        return res.json({
                            status: 204,
                            message: "No Content"
                        })
                    }
                } else if (chooseAllAd.type_of_campaign.toLowerCase() === 'click') {
                    let result = 0

                    if (chooseAllAd.click && chooseAllAd.click.length > 0) {
                        for (let i = 0; i < chooseAllAd.click.length; i++) {
                            result += chooseAllAd.click[i].count;
                        }
                    }

                    if (result < chooseAllAd.advertisement_limit) {
                        await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, deviceId)
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: {
                                campaign_id: chooseAllAd.campaign_id,
                                advertisement_media_type: chooseAllAd.advertisement_media_type,
                                advertisement_link: chooseAllAd.advertisement_link,
                                advertisement_title: chooseAllAd.advertisement_title,
                                advertisement_description: chooseAllAd.advertisement_description,
                                advertisement_action_text: chooseAllAd.advertisement_action_text
                            }
                        })
                    } else {
                        await model.updateStatusAd(chooseAllAd.campaign_id)
                        return res.json({
                            status: 204,
                            message: "No Content"
                        })
                    }
                } else if (chooseAllAd.type_of_campaign.toLowerCase() === 'fullView') {
                    let result = 0

                    if (chooseAllAd.full_view && chooseAllAd.full_view.length > 0) {
                        for (let i = 0; i < chooseAllAd.full_view.length; i++) {
                            result += chooseAllAd.full_view[i].count;
                        }
                    }

                    if (result < chooseAllAd.advertisement_limit) {
                        await model.addAction(app?.app_id, adId, chooseAllAd?.campaign_id, deviceId)
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: {
                                campaign_id: chooseAllAd.campaign_id,
                                advertisement_media_type: chooseAllAd.advertisement_media_type,
                                advertisement_link: chooseAllAd.advertisement_link,
                                advertisement_title: chooseAllAd.advertisement_title,
                                advertisement_description: chooseAllAd.advertisement_description,
                                advertisement_action_text: chooseAllAd.advertisement_action_text
                            }
                        })
                    } else {
                        await model.updateStatusAd(chooseAllAd.campaign_id)
                        return res.json({
                            status: 204,
                            message: "No Content"
                        })
                    }
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