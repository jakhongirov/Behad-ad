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
        user_full_name = $2,
        user_company_name = $3,
        user_phone = $4,
        user_password = $5
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
const userByFullName = (fullName, offset, sort) => {
    const BY_FIRST_NAME = `
        SELECT
            *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            users_ads
        WHERE
            user_full_name ilike '%${fullName}%'
        ORDER BY
            ${sort}
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_FIRST_NAME)
}
const userByCompanyName = (companyName, offset, sort) => {
    const BY_EMAIL = `
        SELECT
            *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            users_ads
        WHERE
            user_company_name ilike '%${companyName}%'
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
const updateUser = (id, full_name, company_name,  phone, pass_hash) => fetch(UPDADE_USER, id, full_name, company_name,  phone, pass_hash)
const deleteUser = (id) => fetch(DELETE_USER, id)

module.exports = {
    userById,
    userByFullName,
    userByCompanyName,
    userByPhone,
    getUsers,
    updateUser,
    deleteUser
}