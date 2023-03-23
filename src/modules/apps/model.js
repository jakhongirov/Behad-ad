const { fetch, fetchALL } = require("../../lib/postgres");

const ALL_APPS = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM 
        apps_side
    ORDER BY
        app_id DESC
    LIMIT 50;
`;

const BY_ID = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM 
        apps_side 
    WHERE
        app_id = $1;
`;

const BY_ID_EARNING = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM 
        apps_side a
    INNER JOIN
        action_result b
    ON
        b.app_ads_id = any (a.banner_id) or
        b.app_ads_id = any (a.inters_id) or
        b.app_ads_id = any (a.rewarded_id) or
        b.app_ads_id = any (a.native_banner_id)
    WHERE
        a.app_id = $1;
`;

const ADD_APP = `
    INSERT INTO
        apps_side (
            developer_id,
            app_name,
            app_link,
            banner_id,
            inters_id,
            rewarded_id,
            native_banner_id,
            app_image,
            app_image_name
        )
    VALUES (
        $1,
        $2,
        $3,
        ARRAY [ $4 ] ,
        ARRAY [ $5 ] ,
        ARRAY [ $6 ] ,
        ARRAY [ $7 ] ,
        $8,
        $9
    ) RETURNING *
`;

const UPDATE_APP = `
        UPDATE
            apps_side
        SET
            developer_id = $2,
            app_name = $3,
            app_link = $4,
            banner_id = array_append(banner_id, $5),
            inters_id = array_append(inters_id, $6),
            rewarded_id = array_append(rewarded_id, $7),
            native_banner_id = array_append(native_banner_id, $8),
            app_image = $9,
            app_image_name = $10
        WHERE
            app_id = $1
        RETURNING *;
`;

const UPDATE_APP_STATUS = `
        UPDATE
            apps_side
        SET
            category_id = $2,
            app_status = $3
        WHERE
            app_id = $1
        RETURNING *;
`;

const DELETE_APP = `
    DELETE FROM
        apps_side
    WHERE
        app_id = $1
    RETURNING *;
`;

const FOUND_USER = `
        SELECT
            user_role
        FROM
            users_ads
        WHERE
            user_id =$1;
`;

const allApps = () => fetchALL(ALL_APPS);
const appsById = (appId) => fetchALL(BY_ID, appId)
const appsByOffset = (offset) => {
    const APPS = `
        SELECT
            *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM 
            apps_side
        ORDER BY
            app_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(APPS)
};
const appsByCatrgory = (appCategory, offset) => {
    const APPS_BY_CATEGORY = `
        SELECT
            *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM 
            apps_side
        WHERE
            app_category ilike '%${appCategory}%'
        ORDER BY
            app_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(APPS_BY_CATEGORY)
};
const appsByName = (appName, offset) => {
    const APPS_BY_NAME = `
        SELECT
            *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM 
            apps_side
        WHERE
            app_name ilike '%${appName}%'
        ORDER BY
            app_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(APPS_BY_NAME)
};
const appsByUserId = (userId, offset) => {
    const APPS_BY_USER_ID = `
        SELECT
            *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM 
            apps_side
        WHERE
            developer_id = ${Number(userId)}
        ORDER BY    
            app_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;                      

    return fetchALL(APPS_BY_USER_ID)
};
const addApp = (userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id, image, image_name) => fetch(ADD_APP, userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id, image, image_name)
const updateApp = (app_id, userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id, image_url, image_name) => fetch(UPDATE_APP, app_id, userId, appName, app_link, banner_id, inters_id, rewarded_id, native_banner_id, image_url, image_name)
const updateStatus = (app_id, category_id, status) => fetch(UPDATE_APP_STATUS, app_id, category_id, status)
const deleteApp = (app_id) => fetch(DELETE_APP, app_id)
const foundUser = (userId) => fetch(FOUND_USER, userId)
const getAppResult = (appId) => fetch(BY_ID_EARNING, appId)

module.exports = {
    allApps,
    appsById,
    appsByOffset,
    appsByCatrgory,
    appsByName,
    appsByUserId,
    addApp,
    updateApp,
    updateStatus,
    deleteApp,
    foundUser,
    getAppResult
}
