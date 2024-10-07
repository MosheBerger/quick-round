CREATE TABLE "games_assets"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "game_id" BIGINT NOT NULL,
    "asset_id" BIGINT NOT NULL
    UNIQUE ("game_id", "asset_id")
);

CREATE TABLE "assets"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "data" bytea NOT NULL
);

CREATE TABLE "games_played_by_users"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE "likes"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "like" BOOLEAN NOT NULL,
    UNIQUE ("game_id", "user_id")
);

CREATE TABLE "games"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "creator_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "game_data" JSON NOT NULL,
    "cover" BIGINT NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE "assets_approved_by_the_manager"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "asset_id" BIGINT NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE "games_approved_by_the_manager"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "game_id" BIGINT NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE "finish_times"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "finish_time" BIGINT NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE "users"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "avatar" VARCHAR(255) NOT NULL,
    UNIQUE("email")
);

CREATE TABLE "reported_games"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "game_id" BIGINT NOT NULL,
    "by_user_id" BIGINT NOT NULL,
    "date" DATE NOT NULL
);

-- ALTER TABLE
--     "reported_games" ADD CONSTRAINT "reported_games_by_user_id_foreign" FOREIGN KEY("by_user_id") REFERENCES "users"("id");
-- ALTER TABLE
--     "likes" ADD CONSTRAINT "likes_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
-- ALTER TABLE
--     "finish_times" ADD CONSTRAINT "finish_times_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "games"("id");
-- ALTER TABLE
--     "likes" ADD CONSTRAINT "likes_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "games"("id");
-- ALTER TABLE
--     "games_assets" ADD CONSTRAINT "games_assets_asset_id_foreign" FOREIGN KEY("asset_id") REFERENCES "assets"("id");
-- ALTER TABLE
--     "reported_games" ADD CONSTRAINT "reported_games_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "games"("id");
-- ALTER TABLE
--     "finish_times" ADD CONSTRAINT "finish_times_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
-- ALTER TABLE
--     "games_assets" ADD CONSTRAINT "games_assets_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "games"("id");
-- ALTER TABLE
--     "games_played_by_users" ADD CONSTRAINT "games_played_by_users_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
-- ALTER TABLE
--     "games_played_by_users" ADD CONSTRAINT "games_played_by_users_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "games"("id");
-- ALTER TABLE
--     "assets_approved_by_the_manager" ADD CONSTRAINT "assets_approved_by_the_manager_asset_id_foreign" FOREIGN KEY("asset_id") REFERENCES "assets"("id");
-- ALTER TABLE
--     "games" ADD CONSTRAINT "games_creator_id_foreign" FOREIGN KEY("creator_id") REFERENCES "users"("id");
-- ALTER TABLE
--     "games_approved_by_the_manager" ADD CONSTRAINT "games_approved_by_the_manager_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "games"("id");