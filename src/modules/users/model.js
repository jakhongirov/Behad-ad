const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
    SELECT
        *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        users_ads
    WHERE
        user_id = $1;
`;

const UPDADE_USER = `
    UPDATE
        users_ads
    SET
        user_first_name = $2,
        user_last_name = $3,
        user_email = $4,
        user_phone = $5,
        user_password = $6
    WHERE
        user_id = $1
    RETURNING *;
`;

const DELETE_USER = `
    DELETE FROM
        users_ads
    WHERE
        user_id
    RETURNING *;
`;

const userById = (id) => fetchALL(BY_ID, id)
const userByFirstName = (firstName, offset, sort) => {
    const BY_FIRST_NAME = `
        SELECT
            *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            users_ads
        WHERE
            user_first_name ilike '%${firstName}%'
        ORDER BY
            ${sort}
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_FIRST_NAME)
}
const userByLastName = (lastName, offset, sort) => {
    const BY_LAST_NAME = `
        SELECT
            *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            users_ads
        WHERE
            user_last_name ilike '%${lastName}%'
        ORDER BY
            ${sort}
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_LAST_NAME)
}
const userByEmail = (email, offset, sort) => {
    const BY_EMAIL = `
        SELECT
            *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            users_ads
        WHERE
            user_email ilike '%${email}%'
        ORDER BY
            ${sort}
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_EMAIL)
}
const userByPhone = (phone, offset, sort) => {
    const BY_PHONE = `
    SELECT
        *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        users_ads
    WHERE
        user_phone ilike '%${phone}%'
    ORDER BY
        ${sort}
    OFFSET ${offset}
    LIMIT 50;
`;

    return fetchALL(BY_PHONE)
}
const getUsers = (offset, sort) => {
    const USERS = `
        SELECT 
            *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            users_ads
        ORDER BY
            ${sort}
        OFFSET ${offset}
        LIMIT 50
    `;

    return fetchALL(USERS)
}
const updateUser = (id, first_name, last_name, email, phone, pass_hash) => fetch(UPDADE_USER, id, first_name, last_name, email, phone, pass_hash)
const deleteUser = (id) => fetch(DELETE_USER, id)

module.exports = {
    userById,
    userByFirstName,
    userByLastName,
    userByEmail,
    userByPhone,
    getUsers,
    updateUser,
    deleteUser
}