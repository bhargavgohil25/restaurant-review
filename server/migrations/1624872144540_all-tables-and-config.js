/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    
    CREATE TABLE users (
        user_id uuid PRIMARY KEY DEFAULT
        uuid_generate_v4(),
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_password VARCHAR(255) NOT NULL
    );

    CREATE TABLE restaurants (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(100),
        price_range INTEGER NOT NULL,
        text_token tsvector,
        userid uuid NOT NULL REFERENCES users(user_id)
    );

    CREATE TABLE reviews (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        restaurant_id INT NOT NULL REFERENCES restaurants(id),
        name VARCHAR(50) NOT NULL,
        review TEXT NOT NULL,
        rating INT NOT NULL CHECK(rating >= 1 and rating <= 5),
        userid uuid NOT NULL REFERENCES users(user_id)
    );


    CREATE INDEX token_idx ON restaurants(text_token);

    CREATE FUNCTION ts_vector_trigger() RETURNS trigger as $$
    BEGIN
        
        new.text_token := 
            to_tsvector(new.name || ' ' || new.location);
        
        RETURN NEW;
    END

    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tsvector_trigger BEFORE INSERT OR UPDATE
        ON restaurants FOR EACH ROW EXECUTE PROCEDURE ts_vector_trigger();

    
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE restaurants CASCADE;
        DROP TABLE reviews CASCADE;
        DROP TABLE users CASCADE;
        DROP TRIGGER tsvector_trigger;
    `)
};
