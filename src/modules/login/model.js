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
            user_first_name,
            user_last_name,
            user_phone,
            user_email,
            user_password,
            user_role
        )
    VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6  
        ) RETURNING *;
`;

const getUser = (phone) => fetch(foundUser, phone);
const registerUser = (first_name, last_name, phone, email, pass_hash, role) => fetch(ADD_USER, first_name, last_name, phone, email, pass_hash, role)

module.exports = {
    getUser,
    registerUser
}