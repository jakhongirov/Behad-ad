const { fetch, fetchALL } = require("../../lib/postgres");

const ACTIONS_TEMP = `
    SELECT 
        campaign_id, app_ads_id, actions, count(action_temp_id)::INT 
    FROM 
        action_temp 
    group by 
        app_ads_id, actions, campaign_id
    ORDER BY 
        actions;
`;

const ACTIONS_TEMP_CAMPAIGN = `
    SELECT 
        campaign_id, actions, count(action_temp_id)::INT 
    FROM 
        action_temp 
    group by 
        campaign_id, actions, campaign_id
    ORDER BY 
        campaign_id;
`;

const ACTIONS_TEMP_PRICE_COUNT = `
    SELECT 
        app_ads_id, sum(action_price)::float 
    FROM 
        action_temp  
    group by 
        app_ads_id;
`;

const ACTIONS_TEMP_CAMPAIGN_PRICE_COUNT = `
    SELECT 
        campaign_id, sum(action_price)::float 
    FROM 
        action_temp  
    group by 
        campaign_id;
`;

const ADD_PRICE_COUNT = `
    UPDATE
        action_result
    SET
       action_earning = $2
    WHERE
        app_ads_id = $1
    RETURNING *;
`;

const ADD_REQUEST_COUNT = `
    INSERT INTO  
        action_result (
            action_result_time,
            app_ads_id,
            request_count
        )
    VALUES (     
        $1,
        $2,
        $3
    ) RETURNING *;
`;

const ADD_VIEW_COUNT = `
    UPDATE
        action_result
    SET
        views_count = $2
    WHERE
        app_ads_id = $1;
`;

const ADD_CLICK_COUNT = `
    UPDATE
        action_result
    SET
        clicks_count = $2
    WHERE
        app_ads_id = $1;
`;

const ADD_CLICK_COUNT_CAMPAIGN = `
    UPDATE
        action_result_campaign
    SET
        clicks_count = $2
    WHERE
        campaign_id = $1;
`;

const ADD_FULL_VIEW_COUNT = `
    UPDATE
        action_result
    SET
        full_views_count = $2
    WHERE
        app_ads_id = $1;
`;

const ADD_FULL_VIEW_COUNT_CAMPAIGN = `
    UPDATE
        action_result_campaign
    SET
        full_views_count = $2
    WHERE
        campaign_id = $1;
`;

const CLEAR_TABLE = `
    TRUNCATE TABLE action_temp ;
`;

const ACTION_RESULT = `
    SELECT
        *
    FROM
        action_result
    ORDER BY
        action_result_id DESC
    LIMIT 50; 
`;

const ADD_ACTION_TEMP = `
    INSERT INTO
        action_temp (
            app_id,
            app_ads_id,
            actions,
            campaign_id,
            user_id,
            action_price
        )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
    ) RETURNING *;
`;

const FOUND_APP = `
    SELECT 
        *
    FROM   
        apps_side
    WHERE
        $1 = ANY (banner_id) or
        $1 = ANY (inters_id) or
        $1 = ANY (rewarded_id) or 
        $1 = ANY (native_banner_id);
`;

const FOUND_ADS = `
        SELECT
            *
        FROM
            advertisements
        WHERE
            campaign_id = $1;
`;

const ACTION_RESULT_CAMPAIGN = `
    SELECT 
        campaign_id, 
        sum(views_count)::int as views, 
        sum(clicks_count)::int as click, 
        sum(full_views_count)::int as full_views
    FROM 
        action_result_campaign 
    group by 
        campaign_id;
`;

const UPDATE_ADS_COUNT = `
    Update 
        advertisements 
    SET 
        view = array_append(view, $2),
        click = array_append(click, $3),
        full_view = array_append(full_view, $4)
    WHERE
        campaign_id = $1
    RETURNING *;
`;

const ADD_ACTION_RESULT_CAMPAIGN = `
    INSERT INTO 
        action_result_campaign (
            action_result_time,
            campaign_id,
            views_count
        )
    VALUES (
        $1,
        $2,
        $3
    ) RETURNING *;
`;

const ADD_PRICE_CAMPAIGN_COUNT = `
    UPDATE
        action_result_campaign
    SET
        action_earning = $2
    WHERE
        campaign_id = $1
    RETURNING *;
`;

const ACTIONS_RESULT_VIEW_CLICK_COUNT = `
    SELECT 
        campaign_id, 
        sum(views_count)::int as views, 
        sum(clicks_count)::int as click
    FROM 
        action_result_campaign 
    group by 
        campaign_id;
`;

const UPDATE_AD_CTR = `
    UPDATE
        advertisements
    SET
        advertisement_ctr = array_append(advertisement_ctr, $2)
    WHERE
        campaign_id = $1
    RETURNING *;
`;

const ACTON_TEMP_USER_ID = `
    SELECT
        app_ads_id,
        user_id
    FROM
        action_temp
    WHERE
        actions = 3;        
`;

const ACTON_TEMP_CAMPAIGN_USER_ID = `
    SELECT
        campaign_id,
        user_id
    FROM
        action_temp
    WHERE
        actions = 3;        
`;

const ADD_ACTION_APP_ADS_USER_ID = `
    UPDATE
        action_result
    SET
        user_id = array_append(user_id, $2)
    WHERE
        app_ads_id = $1
    RETURNING *;
`;

const ADD_ACTION_CAMPAIGN_USER_ID = `
    UPDATE
        action_result_campaign
    SET
        user_id = array_append(user_id, $2)
    WHERE
        campaign_id = $1
    RETURNING *;
`;

const actionTemp = () => fetchALL(ACTIONS_TEMP)
const actionTempCampaign = () => fetchALL(ACTIONS_TEMP_CAMPAIGN)
const actionTempPriceCount = () => fetchALL(ACTIONS_TEMP_PRICE_COUNT)
const actionTempCampaignPrice = () => fetchALL(ACTIONS_TEMP_CAMPAIGN_PRICE_COUNT)
const addActionResultCampaignCount = (id, sum) => fetch(ADD_PRICE_CAMPAIGN_COUNT, id, sum)
const addCount = (id, sum) => fetch(ADD_PRICE_COUNT, id, sum)
const addActionResultRequest = (time, id, count) => fetch(ADD_REQUEST_COUNT, time, id, count)
const addActionResultView = (id, count) => fetch(ADD_VIEW_COUNT, id, count)
const addActionResultClick = (id, count) => fetch(ADD_CLICK_COUNT, id, count)
const addActionResultFullViews = (id, count) => fetch(ADD_FULL_VIEW_COUNT, id, count)
const addActionResultCampaignView = (time, campaign_id, count) => fetch(ADD_ACTION_RESULT_CAMPAIGN, time, campaign_id, count)
const addActionResultCampaignClick = (campaign_id, count) => fetch(ADD_CLICK_COUNT_CAMPAIGN, campaign_id, count)
const addActionResultCampaignFullView = (campaign_id, count) => fetch(ADD_FULL_VIEW_COUNT_CAMPAIGN, campaign_id, count)
const clearActionTemp = () => fetch(CLEAR_TABLE)
const actionResultById = (id, offset) => {
    const ACTION_RESULT_BY_ID = `
        SELECT
            *
        FROM
          action_result
        WHERE
             app_ads_id = '%${id}%'
        ORDER BY
            action_result_id DESC
        OFFSET ${offset}
        LIMIT 50; 
    `;

    return fetchALL(ACTION_RESULT_BY_ID)
};
const actionResultByOffset = (offset) => {
    const ACTION_RESULT_BY_ID = `
        SELECT
            *
        FROM
          action_result
        ORDER BY
            action_result_id DESC
        OFFSET ${offset}
        LIMIT 50; 
    `;

    return fetchALL(ACTION_RESULT_BY_ID)
}
const actionResult = () => fetchALL(ACTION_RESULT)
const addActionTemp = (app_id, app_ads_id, action, campaign_id, user_id, price) => fetch(ADD_ACTION_TEMP, app_id, app_ads_id, action, campaign_id, user_id, price)
const foundApp = (app_ads_id) => fetch(FOUND_APP, app_ads_id)
const foundAds = (campaign_id) => fetch(FOUND_ADS, campaign_id)
const actionResultCampaign = () => fetchALL(ACTION_RESULT_CAMPAIGN)
const updateAdsCount = (id, view, click, fullView) => fetch(UPDATE_ADS_COUNT, id, view, click, fullView)
const actionResultCampaignCtr = () => fetch(ACTIONS_RESULT_VIEW_CLICK_COUNT)
const updateAdCTR = (campaign_id, ctrObj) => fetch(UPDATE_AD_CTR, campaign_id, ctrObj)
const actionTempUsers = () => fetchALL(ACTON_TEMP_USER_ID)
const actionTempCampaignUsers = () => fetchALL(ACTON_TEMP_CAMPAIGN_USER_ID)
const addActionAppAdsUserId = (id, user_id) => fetch(ADD_ACTION_APP_ADS_USER_ID, id, user_id)
const addActionsCampaignUserId = (id, user_id) => fetch(ADD_ACTION_CAMPAIGN_USER_ID, id, user_id)

module.exports = {
    actionTemp,
    actionTempCampaign,
    addCount,
    actionTempPriceCount,
    actionTempCampaignPrice,
    addActionResultRequest,
    addActionResultView,
    addActionResultClick,
    addActionResultFullViews,
    clearActionTemp,
    actionResultById,
    actionResultByOffset,
    actionResult,
    addActionTemp,
    foundApp,
    foundAds,
    actionResultCampaign,
    updateAdsCount,
    addActionResultCampaignView,
    addActionResultCampaignCount,
    addActionResultCampaignClick,
    addActionResultCampaignFullView,
    actionResultCampaignCtr,
    updateAdCTR,
    actionTempUsers,
    actionTempCampaignUsers,
    addActionAppAdsUserId,
    addActionsCampaignUserId
}