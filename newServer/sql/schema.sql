CREATE TABLE "games_assets"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "game_id" BIGINT NOT NULL,
    "asset_id" BIGINT NOT NULL,
    UNIQUE ("game_id", "asset_id")
    FOREIGN KEY ("game_id") REFERENCES "games"("id"),
    FOREIGN KEY ("asset_id") REFERENCES "assets"("id")
);

CREATE TABLE "assets"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "data" bytea NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE TABLE "games_played_by_users"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id"),
    FOREIGN KEY ("game_id") REFERENCES "games"("id")
);

CREATE TABLE "likes"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "like" BOOLEAN NOT NULL,
    UNIQUE ("game_id", "user_id"),
    FOREIGN KEY ("user_id") REFERENCES "users"("id"),
    FOREIGN KEY ("game_id") REFERENCES "games"("id")
);

CREATE TABLE "games"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "creator_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "game_data" JSON NOT NULL,
    "cover" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    FOREIGN KEY ("creator_id") REFERENCES "users"("id")
    FOREIGN KEY ("cover") REFERENCES "assets"("id")
);

CREATE TABLE "assets_approved_by_the_manager"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "asset_id" BIGINT NOT NULL,
    FOREIGN KEY ("asset_id") REFERENCES "assets"("id")
);

CREATE TABLE "games_approved_by_the_manager"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "game_id" BIGINT NOT NULL,
    FOREIGN KEY ("game_id") REFERENCES "games"("id")
);

CREATE TABLE "finish_times"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "finish_time" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id"),
    FOREIGN KEY ("game_id") REFERENCES "games"("id")
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
    "date" DATE NOT NULL,
    FOREIGN KEY ("game_id") REFERENCES "games"("id"),
    FOREIGN KEY ("by_user_id") REFERENCES "users"("id")
);
