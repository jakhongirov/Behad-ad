CREATE TABLE users_ads (
    user_id bigserial PRiMARY KEY,
    user_first_name text not null,
    user_last_name text not null,
    user_email text not null,
    user_phone text not null,
    user_password text not null,
    user_balance int DEFAULT 0,
    user_role text not null,
    user_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_categories(
    category_id bigserial PRiMARY KEY,
    category_name text not null,
    category_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE apps_side (
    app_id bigserial PRiMARY KEY,
    app_name text not null,
    app_link text not null,
    app_image text not null,
    app_image_name text not null,
    category_id int,
    developer_id int not null REFERENCES users_ads(user_id) ON DELETE CASCADE,
    app_status BOOLEAN DEFAULT false,
    banner_id text [],
    inters_id text [],
    rewarded_id text [],
    native_banner_id text [],
    app_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE advertisements (
    campaign_id bigserial PRiMARY KEY,
    campaign_name text not null,
    type_of_campaign text not null,
    advertisement_title text not null,
    advertisement_description text not null,
    advertisement_media_link text,
    advertisement_media_name text,
    advertisement_link text,
    advertisement_click_link text not null,
    advertisement_limit int DEFAULT 100000,
    advertisement_budget int not null,
    action_price numeric(10,2) not null,
    click json [],
    view json [],
    full_view json [],
    gender text not null,
    max_age int not null,
    min_age int not null,
    country text not null,
    city text not null,
    interest text not null,
    phone_lang text not null,
    advertisement_pending_audince int DEFAULT 0,
    advertisement_pending_target int DEFAULT 0,
    advertisement_category text not null,
    advertisement_ctr json [],
    click_per_user int not null,
    advertisement_type text not null,
    advertisement_media_type text not null,
    advertising_id int not null REFERENCES users_ads(user_id) ON DELETE CASCADE,
    advertisement_active BOOLEAN DEFAULT true,
    advertisement_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE action_temp (
    action_temp_id bigserial PRiMARY KEY,
    app_id int not null REFERENCES apps_side(app_id) ON DELETE CASCADE,
    app_ads_id text not null,
    campaign_id int not null REFERENCES advertisements(campaign_id) ON DELETE CASCADE,
    actions int not null,
    action_price numeric(10,2) not null,
    user_id int not null REFERENCES users(user_id) ON DELETE CASCADE,
    action_temp_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE action_result (
    action_result_id bigserial PRiMARY KEY,
    action_result_time text not null,
    app_ads_id text not null,
    request_count int DEFAULT 0,
    views_count int DEFAULT 0,
    clicks_count int DEFAULT 0,
    full_views_count int DEFAULT 0,
    action_earning numeric(10,2) DEFAULT 0,
    user_id int [],
    action_result_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE action_result_campaign (
    action_result_id bigserial PRiMARY KEY,
    action_result_time text not null,
    views_count int DEFAULT 0,
    clicks_count int DEFAULT 0,
    full_views_count int DEFAULT 0,
    action_earning numeric(10,2) DEFAULT 0,
    campaign_id int not null REFERENCES advertisements(campaign_id) ON DELETE CASCADE,
    user_id int [],
    action_result_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);