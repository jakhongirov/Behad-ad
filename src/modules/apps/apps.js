const model = require('./model');
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET_APP_SIDE: async (req, res) => {
        try {
            const { appId, userId, appName, appCategory, offset } = req.query

            if (userId && offset) {
                const appsByUserId = await model.appsByUserId(userId, offset)

                if (appsByUserId) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appsByUserId
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (appName && offset) {
                const appsByName = await model.appsByName(appName, offset)

                if (appsByName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appsByName
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (appCategory && offset) {
                const appsByCatrgory = await model.appsByCatrgory(appCategory, offset)

                if (appsByCatrgory) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appsByCatrgory
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (appId) {
                const appsById = await model.appsById(appId)

                if (appsById) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appsById
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (offset) {
                const appsByOffset = await model.appsByOffset(offset)

                if (appsByOffset) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appsByOffset
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else {
                const allApps = await model.allApps()

                if (allApps) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: allApps
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
            const { userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id } = req.body
            const uploadPhoto = req.file;
            const foundUser = await model.foundUser(userId)

            if (foundUser && foundUser.user_role == 'developer') {
                const image_name = uploadPhoto.filename;
                const image_url = `https://ads.adstar.uz/public/images/${uploadPhoto.filename}`;

                const addApp = await model.addApp(userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id, image_url, image_name)

                if (addApp) {
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
                    message: "User not found"
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

    PUT: async (req, res) => {
        try {
            const { app_id, userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id } = req.body
            const uploadPhoto = req.file;
            const appsById = await model.appsById(app_id)
            let image_name = "";
            let image_url = "";

            if (appsById) {
                const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${appsById?.app_image_name}`))

                if (uploadPhoto) {
                    deleteOldLogo.delete()
                    image_name = uploadPhoto.filename
                    image_url = `https://ads.adstar.uz/public/images/${uploadPhoto.filename}`
                } else {
                    image_url = appsById?.app_image
                    image_name = appsById?.app_image_name
                }

                const updateApp = await model.updateApp(app_id, userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id, image_url, image_name)

                if (updateApp) {
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
                    message: "App not found"
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
            const { app_id, category_id, status } = req.body
            const appsById = await model.appsById(app_id)

            if (appsById) {
                const updateStatus = await model.updateStatus(app_id, category_id, status)

                if (updateStatus) {
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
                    message: "App not found"
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

    DELETE_APP: async (req, res) => {
        try {
            const { app_id } = req.body
            const appsById = await model.appsById(app_id)
            const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${appsById?.app_image_name}`))
            const deleteApp = await model.deleteApp(app_id)

            if (deleteApp) {
                deleteOldLogo.delete()
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Baq request"
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

    GET_RESULT: async (req, res) => {
        try {
            const { appId } = req.body
            const result = await model.getAppResult(appId)

            if (result) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: result
                })
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