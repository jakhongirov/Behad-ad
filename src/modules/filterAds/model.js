const { fetch, fetchALL } = require("../../lib/postgres");

const FOUND_USER = `
    SELECT
        *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        users
    WHERE
        $1 = ANY (user_device_id);
`;

const CHOOSE_ALL = `
    SELECT
        campaign_id,
        advertisement_link 
    FROM
        advertisements
    WHERE  
        gender = 'all' and 
        max_age = 100 and min_age = 0 and country = 'all' and city = 'all';
`;

const ADD_ACTION_TEMP = `
    INSERT INTO
        action_temp (
            app_id,
            app_ads_id,
            campaign_id,
            actions,
            user_id,
            action_price
        )
    VALUES (
        $1,
        $2,
        $3,
        1,
        $5,
        0
    ) RETURNING *;
`;

const FOUND_APP = `
        SELECT 
           app_id
        FROM   
            apps_side
        WHERE
             $1 = ANY (banner_id) or
             $1 = ANY (inters_id) or
             $1 = ANY (rewarded_id) or
             $1 = ANY (native_banner_id);
`;

const foundUser = (deviceId) => fetch(FOUND_USER, deviceId)
const foundAd = (age, who, country, city, phone_lang) => {
    const FOUND_AD = `
        SELECT
            campaign_id,
            advertisement_link
        FROM
            advertisements
        WHERE
            ( gender ilike '%${who}%' or gender = 'all' ) and 
            ( max_age >= ${age} or ${age} >= min_age ) and
            ( country ilike '%${country}%' or country = 'all' ) and
            ( city ilike '%${city}%' or city = 'all' ) and
            (  phone_lang ilike '%${phone_lang}%' or phone_lang = 'all' );
    `;

    return fetchALL(FOUND_AD)
}
const chooseAllAd = () => fetch(CHOOSE_ALL)
const addAction = (app_id, adId, campaign_id, user_id) => fetch(ADD_ACTION_TEMP, app_id, adId, campaign_id, user_id)
const foundApp = (adId) => fetch(FOUND_APP, adId)

module.exports = {
    foundUser,
    foundAd,
    chooseAllAd,
    addAction,
    foundApp
}