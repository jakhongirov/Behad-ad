const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
        SELECT
            *, to_char(category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            app_categories
        WHERE
            category_id = $1;

`;

const CHECK_CATEGORY = `------*-
        SELECT
            *, to_char(category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            app_categories
        WHERE
            category_id = $1;

`;

const BY_NAME = `
        SELECT
            *, to_char(category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            app_categories
        WHERE
            category_name ilike $1;

`;

const CATEGORIES = `
        SELECT
            *, to_char(category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            app_categories
        ORDER BY
            category_id DESC;

`;

const ADD_CATEGORY = `
    INSERT INTO
        app_categories (
            category_name
        )
    VALUES (
        $1
    ) RETURNING *
`;

const UPDATE_CATEGORY = `
        UPDATE
            app_categories
        SET
            category_name = $2
        WHERE
            category_id = $1
        RETURNING *;
`;

const DELETE_CATEGORY = `
        DELETE FROM
            app_categories
        WHERE
            category_id = $1
        RETURNING *;
`;

const categoryId = (id) => fetchALL(BY_ID, id)
const categoryName = (name) => fetchALL(BY_NAME, name)
const categories = () => fetchALL(CATEGORIES)
const addCategory = (category_name) => fetch(ADD_CATEGORY, category_name)
const categoryCheck = (id) => fetch(CHECK_CATEGORY, id)
const updateCategory = (id, category_name) => fetch(UPDATE_CATEGORY, id, category_name)
const deleteCategory = (id) => fetch(DELETE_CATEGORY, id)

module.exports = {
    categoryId,
    categoryName,
    categories,
    addCategory,
    categoryCheck,
    updateCategory,
    deleteCategory
}