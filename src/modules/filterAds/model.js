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
        advertisement_link 
    FROM
        advertisements
    WHERE  
        gender = 'all' and 
        max_age = 100 and min_age = 0 and country = 'all' and city = 'all';
`;

const foundUser = (deviceId) => fetch(FOUND_USER, deviceId)
const foundAd = (age, who, country, city, phone_lang) => {
    const FOUND_AD = `
        SELECT
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

module.exports = {
    foundUser,
    foundAd,
    chooseAllAd
}