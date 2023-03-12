const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, name } = req.query

            if (id) {
                const categoryId = await model.categoryId(id)

                if (categoryId) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: categoryId
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }

            } else if (name) {
                const categoryName = await model.categoryName(`%${name}%`)

                if (categoryName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: categoryName
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else {
                const categories = await model.categories()

                if (categories) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: categories
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
            const { category_name } = req.body

            if (category_name) {
                const addCategory = await model.addCategory(category_name)

                if (addCategory) {
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

    PUT: async (req, res) => {
        try {
            const { id, category_name } = req.body
            const categoryId = await model.categoryCheck(id)

            if (categoryId) {
                const updateCategory = await model.updateCategory(id, category_name)

                if (updateCategory) {
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
    },

    DELETE: async (req, res) => {
        try {
            const { id } = req.body
            const categoryId = await model.categoryCheck(id)

            if (categoryId) {
                const deleteCategory = await model.deleteCategory(id)

                if (deleteCategory) {
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