const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
    SELECT
        *, to_char(advertisement_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        advertisements
    WHERE
        campaign_id = $1;
`;

const ADVERTISEMENTS = `
    SELECT
        *, to_char(advertisement_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        advertisements
    ORDER BY
        campaign_id DESC
    LIMIT 50; 
`;

const ADD_ADVERTISEMENT = `
    INSERT INTO 
        advertisements (
            campaign_name,
            type_of_campaign,
            advertisement_title,
            advertisement_description,
            advertisement_link,
            advertisement_limit,
            advertisement_budget,
            action_price,
            gender,
            max_age,
            min_age,
            country,
            city,
            interest,
            phone_lang,
            advertisement_pending_audince,
            advertisement_category,
            click_per_user,
            advertisement_type,
            advertisement_click_link,
            advertising_id
        )
    VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13,
            $14,
            $15,
            $16,
            $17,
            $18,
            $19,
            $20,
            $21
    ) RETURNING *;
`;

const UPDATE_ADVERTISEMENT = `
    UPDATE
        advertisements
    SET
        campaign_name = $2,
        type_of_campaign = $3,
        advertisement_title = $4,
        advertisement_description = $5,
        advertisement_link = $6,
        advertisement_limit = $7,
        advertisement_budget = $8,
        action_price = $9,
        gender = $10,
        max_age = $11,
        min_age = $12,
        country = $13,
        city = $14,
        interest = $15,
        phone_lang = $16,
        advertisement_pending_audince = $17,
        advertisement_category = $19,
        click_per_user = $20,
        advertisement_type = $21,
        advertisement_click_link = $22,
        advertising_id = $23
    WHERE
        campaign_id = $1
    RETURNING *;
`;

const DELETE_ADVERTISEMENT = `
    DELETE FROM
        advertisements
    WHERE
        campaign_id = $1
    RETURNING *;
`;

const FOUND_USER = `
    SELECT
       user_balance
    FROM
        users_ads
    WHERE 
        user_id = $1;
`;

const advertisementById = (campaign_id) => fetchALL(BY_ID, campaign_id)
const advertisementByName = (campaign_name, offset) => {
    const BY_NAME = `
        SELECT
            *, to_char(advertisement_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            advertisements
        WHERE
            campaign_name ilike '%${campaign_name}%'
        ORDER BY
            campaign_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_NAME)
};
const advertisementByTitle = (advertisement_title, offset) => {
    const BY_TITLE = `
        SELECT
            *, to_char(advertisement_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            advertisements
        WHERE
            advertisement_title ilike '%${advertisement_title}%'
        ORDER BY
            campaign_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_TITLE)
};
const advertisementByTypeOfCampaign = (type_of_campaign, offset) => {
    const BY_TYPE_OF_CAMPAING = `
        SELECT
            *, to_char(advertisement_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            advertisements
        WHERE
              type_of_campaign ilike '%${type_of_campaign}%'
        ORDER BY
            campaign_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_TYPE_OF_CAMPAING)
};
const advertisementByOffset = (offset) => {
    const BY_OFFSET = `
        SELECT
            *, to_char(advertisement_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
        FROM
            advertisements
        ORDER BY
            campaign_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_OFFSET)
}
const advertisements = () => fetchALL(ADVERTISEMENTS)
const addAdvertisement = (
    campaign_name,
    type_of_campaign,
    advertisement_title,
    advertisement_description,
    advertisement_link,
    advertisement_limit,
    advertisement_budget,
    action_price,
    gender,
    max_age,
    min_age,
    country,
    city,
    interest,
    phone_lang,
    advertisement_pending_audince,
    advertisement_category,
    click_per_user,
    advertisement_type,
    advertisement_click_link,
    advertising_id
) => fetch(
    ADD_ADVERTISEMENT,
    campaign_name,
    type_of_campaign,
    advertisement_title,
    advertisement_description,
    advertisement_link,
    advertisement_limit,
    advertisement_budget,
    action_price,
    gender,
    max_age,
    min_age,
    country,
    city,
    interest,
    phone_lang,
    advertisement_pending_audince,
    advertisement_category,
    click_per_user,
    advertisement_type,
    advertisement_click_link,
    advertising_id

)
const updateAdvertisement = (
    campaign_id,
    campaign_name,
    type_of_campaign,
    advertisement_title,
    advertisement_description,
    advertisement_link,
    advertisement_limit,
    advertisement_budget,
    action_price,
    gender,
    max_age,
    min_age,
    country,
    city,
    interest,
    phone_lang,
    advertisement_pending_audince,
    advertisement_category,
    click_per_user,
    advertisement_type,
    advertisement_click_link,
    advertising_id
) => fetch(
    UPDATE_ADVERTISEMENT,
    campaign_id,
    campaign_name,
    type_of_campaign,
    advertisement_title,
    advertisement_description,
    advertisement_link,
    advertisement_limit,
    advertisement_budget,
    action_price,
    gender,
    max_age,
    min_age,
    country,
    city,
    interest,
    phone_lang,
    advertisement_pending_audince,
    advertisement_category,
    click_per_user,
    advertisement_type,
    advertisement_click_link,
    advertising_id
)
const deleteAdvertisement = (campaign_id) => fetch(DELETE_ADVERTISEMENT, campaign_id)
const foundUser = (advertising_id) => fetch(FOUND_USER, advertising_id)
const filterUsers = (gender, max_age, min_age, phone_lang, interest, country, city) => {
    const FILTER_USER_COUNT = `
        SELECT
            count(user_id)
        FROM
            users
        WHERE
            ((user_who = '${gender.toLowerCase()}') or ('${gender.toLowerCase()}' != 'erkak' and '${gender.toLowerCase()}' != 'ayol' )) and
            (user_age >= ${min_age} and user_age <= ${max_age}) and
            ((user_phone_lang = '${phone_lang.toUpperCase()}') or ('${phone_lang.toUpperCase()}' = 'all')) and 
            ((user_country = '${country.toUpperCase()}') or ('${country.toLowerCase()}' = 'all')) and 
            ((user_capital = '${city}') or ('${city.toLowerCase()}' = 'all')) and 
            (( '${interest.toLowerCase()}' = ANY (user_device_id) ) or ('${interest.toLowerCase()}' = 'all'));
    `;

    return fetch(FILTER_USER_COUNT)
}

module.exports = {
    advertisementById,
    advertisementByName,
    advertisementByTitle,
    advertisementByTypeOfCampaign,
    advertisementByOffset,
    advertisements,
    addAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    foundUser,
    filterUsers
}