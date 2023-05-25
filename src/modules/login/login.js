const model = require('./model');
const JWT = require('../../lib/jwt')
const bcryptjs = require('bcryptjs')

module.exports = {
    REGISTER: async (req, res) => {
        try {
            const { full_name, company_name, phone, password, role } = req.body

            const checkUser = await model.getUser(phone)

            if (!checkUser) {
                const pass_hash = await bcryptjs.hash(password, 10)
                const addUser = await model.registerUser(full_name, company_name, phone, pass_hash, role)

                if (addUser) {
                    const token = await new JWT({ id: addUser.user_id, name: addUser.user_role }).sign()

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: addUser,
                        token: token
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }

            } else {
                return res.json({
                    status: 302,
                    message: "Found"
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

    LOGIN: async (req, res) => {
        try {
            const { phone, password } = req.body
            const foundUser = await model.getUser(phone)

            if (foundUser) {
                const validPass = await bcryptjs.compare(password, foundUser.user_password)

                if (validPass) {
                    const token = await new JWT({ id: foundUser.user_id, name: foundUser.user_role }).sign()
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundUser,
                        token: token
                    })
                } else {
                    return res.json({
                        status: 401,
                        message: "Unauthorized"
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
}