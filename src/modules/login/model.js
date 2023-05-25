const { fetch } = require("../../lib/postgres");

const foundUser = `
    SELECT
        *
    FROM
        users_ads
    WHERE
        user_phone = $1;
`;

const ADD_USER = `
    INSERT INTO
        users_ads (
            user_full_name,
            user_company_name,
            user_phone,
            user_password,
            user_role
        )
    VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5
        ) RETURNING *;
`;

const getUser = (phone) => fetch(foundUser, phone);
const registerUser = (full_name, company_name, phone, pass_hash, role) => fetch(ADD_USER, full_name, company_name, phone, pass_hash, role)

module.exports = {
    getUser,
    registerUser
}