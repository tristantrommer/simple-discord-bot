CREATE OR REPLACE PROCEDURE bot.create_tables()
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
    CREATE TABLE IF NOT EXISTS bot.mute_alerts (
        guild_id VARCHAR(255),
        user_id VARCHAR(255),
        notify_user_id VARCHAR(255),
        createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
        updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
        PRIMARY KEY (guild_id, user_id, notify_user_id)
    );
END;
$$