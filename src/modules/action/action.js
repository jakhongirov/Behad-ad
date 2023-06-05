const model = require('./model');
const cron = require('node-cron')

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, offset } = req.query

            // cron.schedule('0 */3 * * *', async () => {

            //     try {
            //         const actionTemp = await model.actionTemp()
            //         const actionTempCampaign = await model.actionTempCampaign()
            //         const actionTempUsers = await model.actionTempUsers()
            //         const actionTempCampaignUsers = await model.actionTempCampaignUsers()
            //         const currDate = new Date();
            //         const currHours = currDate.getHours()
            //         const currMinutes = currDate.getMinutes()
            //         const lastHour = Number(currHours) - 3
            //         const time = `${lastHour > 0 ? lastHour : lastHour + 24}:${currMinutes} - ${currHours}:${currMinutes}`

            //         for (let i = 0; i < actionTemp.length; i++) {

            //             if (actionTemp[i].actions == 1) {
            //                 const added = await model.addActionResultRequest(time, actionTemp[i].app_ads_id, actionTemp[i].count)

            //                 if (added) {
            //                     const actionTempPrice = await model.actionTempPriceCount()

            //                     for (let i = 0; i < actionTempPrice.length; i++) {
            //                         await model.addCount(actionTempPrice[i].app_ads_id, actionTempPrice[i].sum)
            //                     }
            //                 }

            //             } else if (actionTemp[i].actions == 2) {
            //                 await model.addActionResultView(actionTemp[i].app_ads_id, actionTemp[i].count)
            //             } else if (actionTemp[i].actions == 3) {
            //                 await model.addActionResultClick(actionTemp[i].app_ads_id, actionTemp[i].count)
            //             } else if (actionTemp[i].actions == 4) {
            //                 await model.addActionResultFullViews(actionTemp[i].app_ads_id, actionTemp[i].count)
            //             }

            //         }

            //         for (let i = 0; i < actionTempCampaign.length; i++) {
            //             if (actionTempCampaign[i].actions == 2) {
            //                 const added = await model.addActionResultCampaignView(time, actionTempCampaign[i].campaign_id, actionTempCampaign[i].count)

            //                 if (added) {
            //                     const actionTempCampaignPrice = await model.actionTempCampaignPrice()

            //                     for (let i = 0; i < actionTempCampaignPrice.length; i++) {
            //                         await model.addActionResultCampaignCount(actionTempCampaignPrice[i].campaign_id, actionTempCampaignPrice[i].sum)
            //                     }

            //                 }

            //             } else if (actionTempCampaign[i].actions == 3) {
            //                 await model.addActionResultCampaignClick(actionTempCampaign[i].campaign_id, actionTempCampaign[i].count)
            //             } else if (actionTemp[i].actions == 4) {
            //                 await model.addActionResultCampaignFullView(actionTempCampaign[i].campaign_id, actionTempCampaign[i].count)
            //             }
            //         }

            //         for (let i = 0; i < actionTempUsers.length; i++) {
            //             await model.addActionAppAdsUserId(actionTempUsers[i].app_ads_id, actionTempUsers[i].user_id)
            //         }
            //         for (let i = 0; i < actionTempCampaignUsers.length; i++) {
            //             await model.addActionsCampaignUserId(actionTempCampaignUsers[i].campaign_id, actionTempCampaignUsers[i].user_id)
            //         }

            //         const actionResultCampaign = await model.actionResultCampaign()

            //         for (let i = 0; i < actionResultCampaign.length; i++) {
            //             let view = {}
            //             let click = {}
            //             let fullView = {}

            //             view['time'] = time
            //             view['count'] = actionResultCampaign[i].views

            //             click['time'] = time
            //             click['count'] = actionResultCampaign[i].click

            //             fullView['time'] = time
            //             fullView['count'] = actionResultCampaign[i].full_views

            //             await model.updateAdsCount(actionResultCampaign[i].campaign_id, view, click, fullView)
            //         }

            //         const actionResultCampaignCtr = await model.actionResultCampaignCtr()

            //         for (let i = 0; i < actionResultCampaignCtr.length; i++) {
            //             const calcularedCTR = Number((actionResultCampaignCtr[i].click / actionResultCampaignCtr[i].views).toFixed(2))
            //             let ctr = {}

            //             ctr['time'] = time
            //             ctr['precent'] = calcularedCTR

            //             await model.updateAdCTR(actionResultCampaignCtr[i].campaign_id, ctr)
            //         }

            //     } catch (error) {
            //         console.log(error)
            //         res.json({
            //             status: 500,
            //             message: "Internal Server Error",
            //         })
            //     } finally {
            //         await model.clearActionTemp()
            //     }
            // });


            setInterval(async () => {
                try {
                    const actionTemp = await model.actionTemp()
                    const actionTempCampaign = await model.actionTempCampaign()
                    const actionTempUsers = await model.actionTempUsers()
                    const actionTempCampaignUsers = await model.actionTempCampaignUsers()
                    const currDate = new Date();
                    const month = Number(currDate.getMonth()) + 1
                    const day = currDate.getDate()
                    const currHours = currDate.getHours()
                    const currMinutes = currDate.getMinutes()
                    const lastHour = Number(currHours) - 6
                    const time = `${day}.${month}  ${lastHour > 0 ? lastHour : lastHour + 24}:${currMinutes} - ${currHours}:${currMinutes}`

                    for (let i = 0; i < actionTemp.length; i++) {

                        if (actionTemp[i].actions == 1) {
                            const added = await model.addActionResultRequest(time, actionTemp[i].app_ads_id, actionTemp[i].count)

                            if (added) {
                                const actionTempPrice = await model.actionTempPriceCount(actionTemp[i].app_ads_id)

                                for (let i = 0; i < actionTempPrice.length; i++) {
                                    await model.addCount(actionTempPrice[i].app_ads_id, actionTempPrice[i].sum)
                                }
                            }

                        } else if (actionTemp[i].actions == 2) {
                            await model.addActionResultView(actionTemp[i].app_ads_id, actionTemp[i].count)
                        } else if (actionTemp[i].actions == 3) {
                            await model.addActionResultClick(actionTemp[i].app_ads_id, actionTemp[i].count)
                        } else if (actionTemp[i].actions == 4) {
                            await model.addActionResultFullViews(actionTemp[i].app_ads_id, actionTemp[i].count)
                        }

                    }

                    for (let i = 0; i < actionTempCampaign.length; i++) {
                        if (actionTempCampaign[i].actions == 2) {
                            const added = await model.addActionResultCampaignView(time, actionTempCampaign[i].campaign_id, actionTempCampaign[i].count)

                            if (added) {
                                const actionTempCampaignPrice = await model.actionTempCampaignPrice(actionTempCampaign[i].campaign_id)

                                for (let i = 0; i < actionTempCampaignPrice.length; i++) {
                                    await model.addActionResultCampaignCount(actionTempCampaignPrice[i].campaign_id, actionTempCampaignPrice[i].sum)
                                }

                            }

                        } else if (actionTempCampaign[i].actions == 3) {
                            await model.addActionResultCampaignClick(actionTempCampaign[i].campaign_id, actionTempCampaign[i].count)
                        } else if (actionTemp[i].actions == 4) {
                            await model.addActionResultCampaignFullView(actionTempCampaign[i].campaign_id, actionTempCampaign[i].count)
                        }
                    }

                    for (let i = 0; i < actionTempUsers.length; i++) {
                        await model.addActionAppAdsUserId(actionTempUsers[i].app_ads_id, actionTempUsers[i].user_id)
                    }
                    for (let i = 0; i < actionTempCampaignUsers.length; i++) {
                        await model.addActionsCampaignUserId(actionTempCampaignUsers[i].campaign_id, actionTempCampaignUsers[i].user_id)
                    }

                    const actionResultCampaign = await model.actionResultCampaign()
 

                    for (let i = 0; i < actionResultCampaign.length; i++) {
                        let view = {}
                        let click = {}
                        let fullView = {}

                        view['time'] = time
                        view['count'] = actionResultCampaign[i].views

                        click['time'] = time
                        click['count'] = actionResultCampaign[i].click

                        fullView['time'] = time
                        fullView['count'] = actionResultCampaign[i].full_views

                        
                        await model.updateAdsCount(actionResultCampaign[i].campaign_id, view, click, fullView)
                    }

                    const actionResultCampaignCtr = await model.actionResultCampaignCtr()

                    for (let i = 0; i < actionResultCampaignCtr.length; i++) {
                        const calcularedCTR = Number(actionResultCampaignCtr[i].click / actionResultCampaignCtr[i].views)
                        let ctr = {}

                        ctr['time'] = time
                        ctr['precent'] = calcularedCTR

                        await model.updateAdCTR(actionResultCampaignCtr[i].campaign_id, ctr)
                    }

                } catch (error) {
                    console.log(error)
                    res.json({
                        status: 500,
                        message: "Internal Server Error",
                    })
                } finally {
                    await model.clearActionTemp()
                }
            }, 21600000)

            if (id) {
                const actionResultById = await model.actionResultById(id, offset)

                if (actionResultById) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: actionResultById
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (offset) {
                const actionResultByOffset = await model.actionResultByOffset(offset)

                if (actionResultByOffset) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: actionResultByOffset
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else {
                const actionResult = await model.actionResult()

                if (actionResult) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: actionResult
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
    },

    POST: async (req, res) => {
        try {
            const { app_ads_id, action, campaign_id, user_id } = req.body
            const app = await model.foundApp(app_ads_id)
            const ad = await model.foundAds(campaign_id)
            let price = 0;

            if (action == 2 && ad.type_of_campaign.toLowerCase() === 'view') {
                price = price + ad.action_price
            } else if (action == 3 && ad.type_of_campaign.toLowerCase() === 'click') {
                price = price + ad.action_price
            } else if (action == 4 && ad.type_of_campaign.toLowerCase() === 'fullView') {
                price = price + ad.action_price
            }

            const addActionTemp = await model.addActionTemp(app.app_id, app_ads_id, action, campaign_id, user_id, price)

            if (addActionTemp) {
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
}