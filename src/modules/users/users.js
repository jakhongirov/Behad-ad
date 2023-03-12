const model = require('./model');
const bcryptjs = require('bcryptjs')

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, firstName, lastName, email, phone, offset, sort } = req.query

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
            } else if (firstName && offset && sort) {
                const userByFirstName = await model.userByFirstName(firstName, offset, sort)

                if (userByFirstName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByFirstName
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (lastName && offset && sort) {
                const userByLastName = await model.userByLastName(lastName, offset, sort)

                if (userByLastName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByLastName
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (email && offset && sort) {
                const userByEmail = await model.userByEmail(email, offset, sort)

                if (userByEmail) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByEmail
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
            const { id, first_name, last_name, email, phone, password } = req.body
            const userById = await model.userById(id)

            if (userById) {
                const pass_hash = password ? await bcryptjs.hash(password, 10) : userById[0]?.user_password
                const updateUser = await model.updateUser(id, first_name, last_name, email, phone, pass_hash)

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