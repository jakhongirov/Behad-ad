const model = require('./model');
const bcryptjs = require('bcryptjs')

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, fullName, companyName, phone, offset, sort } = req.query

            if (id) {
                const userById = await model.userById(id)

                if (userById.length > 0) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userById
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (fullName && offset && sort) {
                const userByFullName = await model.userByFullName(fullName, offset, sort)

                if (userByFullName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByFullName
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (companyName && offset && sort) {
                const userByCompanyName = await model.userByCompanyName(companyName, offset, sort)

                if (userByCompanyName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByCompanyName
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (phone && offset && sort) {
                const userByPhone = await model.userByPhone(phone, offset, sort)

                if (userByPhone) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByPhone
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (offset && sort) {
                const users = await model.getUsers(offset, sort)

                if (users) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: users
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

    PUT: async (req, res) => {
        try {
            const { id, full_name, company_name,  phone, password } = req.body
            const userById = await model.userById(id)

            if (userById) {
                const pass_hash = password ? await bcryptjs.hash(password, 10) : userById[0]?.user_password
                const updateUser = await model.updateUser(id, full_name, company_name,  phone, pass_hash)

                if (updateUser) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: updateUser
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
            const deleteUser = await model.deleteUser(id)

            if (deleteUser) {
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