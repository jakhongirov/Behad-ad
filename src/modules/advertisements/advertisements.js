const model = require('./model');
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET: async (req, res) => {
        try {
            const { campaign_id, campaign_name, advertisement_title, type_of_campaign, offset, advertisingId } = req.query

            if (campaign_id) {
                const advertisementById = await model.advertisementById(campaign_id)

                if (advertisementById) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: advertisementById
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }

            } else if (advertisingId && offset) {
                const advertisementAdvertisingId = await model.advertisementAdvertisingId(advertisingId, offset)

                if (advertisementAdvertisingId) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: advertisementAdvertisingId
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            } else if (campaign_name && offset) {
                const advertisementByName = await model.advertisementByName(campaign_name, offset)

                if (advertisementByName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: advertisementByName
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            } else if (advertisement_title && offset) {
                const advertisementByTitle = await model.advertisementByTitle(advertisement_title, offset)

                if (advertisementByTitle) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: advertisementByTitle
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            } else if (type_of_campaign && offset) {
                const advertisementByTypeOfCampaign = await model.advertisementByTypeOfCampaign(type_of_campaign, offset)

                if (advertisementByTypeOfCampaign) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: advertisementByTypeOfCampaign
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            } else if (offset) {
                const advertisementByOffset = await model.advertisementByOffset(offset)

                if (advertisementByOffset) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: advertisementByOffset
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            } else {
                const advertisements = await model.advertisements()

                if (advertisements) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: advertisements
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
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
    },

    POST: async (req, res) => {
        try {
            const {
                campaign_name,
                type_of_campaign,
                advertisement_title,
                advertisement_description,
                advertisement_link,
                advertisement_limit,
                advertisement_budget,
                action_price,
                gender,
                max_age,
                min_age,
                country,
                city,
                interest,
                phone_lang,
                advertisement_category,
                click_per_user,
                advertisement_type,
                advertisement_click_link,
                advertisement_media_type,
                advertisement_action_text,
                advertising_id
            } = req.body

            const uploadPhoto = req.file;
            let image_name = "";
            let image_url = "";

            if (uploadPhoto) {
                image_name = uploadPhoto.filename;
                image_url = `https://ads.adstar.uz/public/images/${uploadPhoto.filename}`;
            }

            const advertisement_pending_audince = await model.filterUsers(gender, max_age, min_age, phone_lang, interest, country, city)

            if (action_price && advertisement_limit && advertisement_budget) {
                const addAdvertisement = await model.addAdvertisement(
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    advertisement_budget,
                    action_price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (addAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (advertisement_limit && advertisement_budget) {
                const price = Number((advertisement_budget / advertisement_limit).toFixed(2))

                const addAdvertisement = await model.addAdvertisement(
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    advertisement_budget,
                    price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (addAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (advertisement_limit && action_price) {
                const user = await model.foundUser(advertising_id)

                const addAdvertisement = await model.addAdvertisement(
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    user.user_balance,
                    action_price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (addAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }

            } else if (advertisement_limit) {
                const user = await model.foundUser(advertising_id)
                const price = Number((user.user_balance / advertisement_limit).toFixed(2))

                const addAdvertisement = await model.addAdvertisement(
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    user.user_balance,
                    price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (addAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (action_price) {
                const user = await model.foundUser(advertising_id)
                const limit = Number((user.user_balance / action_price).toFixed(2))

                const addAdvertisement = await model.addAdvertisement(
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    limit,
                    user.user_balance,
                    action_price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (addAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
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
    },

    PUT: async (req, res) => {
        try {
            const {
                campaign_id,
                campaign_name,
                type_of_campaign,
                advertisement_title,
                advertisement_description,
                advertisement_link,
                advertisement_limit,
                advertisement_budget,
                action_price,
                gender,
                max_age,
                min_age,
                country,
                city,
                interest,
                phone_lang,
                advertisement_category,
                click_per_user,
                advertisement_type,
                advertisement_click_link,
                advertisement_media_type,
                advertisement_action_text,
                advertising_id
            } = req.body

            const uploadPhoto = req.file;
            let image_name = "";
            let image_url = "";

            const foundAd = await model.foundAd(campaign_id)
            const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundAd?.advertisement_media_name}`))

            if (uploadPhoto) {
                deleteOldLogo.delete()
                image_name = uploadPhoto.filename
                image_url = `https://ads.adstar.uz/public/images/${uploadPhoto.filename}`
            } else {
                image_url = foundAd?.advertisement_media_link
                image_name = foundAd?.advertisement_media_name
            }


            const advertisement_pending_audince = await model.filterUsers(gender, max_age, min_age, phone_lang, interest, country, city)

            if (action_price && advertisement_limit && advertisement_budget) {
                const updateAdvertisement = await model.updateAdvertisement(
                    campaign_id,
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    advertisement_budget,
                    action_price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (updateAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (advertisement_limit && advertisement_budget) {
                const price = Number((advertisement_budget / advertisement_limit).toFixed(2))

                const updateAdvertisement = await model.updateAdvertisement(
                    campaign_id,
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    advertisement_budget,
                    price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (updateAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (advertisement_limit && action_price) {
                const user = await model.foundUser(advertising_id)

                const updateAdvertisement = await model.updateAdvertisement(
                    campaign_id,
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    user.user_balance,
                    action_price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (updateAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }

            } else if (advertisement_limit) {
                const user = await model.foundUser(advertising_id)
                const price = Number((user.user_balance / advertisement_limit).toFixed(2))

                const updateAdvertisement = await model.updateAdvertisement(
                    campaign_id,
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    advertisement_limit,
                    user.user_balance,
                    price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (updateAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (action_price) {
                const user = await model.foundUser(advertising_id)
                const limit = Number((user.user_balance / action_price).toFixed(2))

                const updateAdvertisement = await model.updateAdvertisement(
                    campaign_id,
                    campaign_name,
                    type_of_campaign,
                    advertisement_title,
                    advertisement_description,
                    image_url ? image_url : advertisement_link,
                    limit,
                    user.user_balance,
                    action_price,
                    gender,
                    max_age,
                    min_age,
                    country,
                    city,
                    interest,
                    phone_lang,
                    advertisement_pending_audince.count,
                    advertisement_category,
                    click_per_user,
                    advertisement_type,
                    advertisement_click_link,
                    advertisement_media_type,
                    image_name,
                    advertisement_action_text,
                    advertising_id
                )

                if (updateAdvertisement) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    DELETE: async (req, res) => {
        try {
            const { campaign_id } = req.body
            const foundAd = await model.foundAd(campaign_id)
            const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundAd?.advertisement_media_name}`))
            const deleteAdvertisement = await model.deleteAdvertisement(campaign_id)

            if (deleteAdvertisement) {
                deleteOldLogo.delete()
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    PUT_STATUS: async (req, res) => {
        try {
            const {campaign_id, status} = req.body
            const foundAd = await model.foundAd(campaign_id)

            if(foundAd) {
                const updateStatus = await model.updateStatus(campaign_id, status)

                if(updateStatus) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else {
                return res.json({
                    status: 404,
                    message: "Not found"
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