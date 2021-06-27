/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE reviews (
            id BIGSERIAL PRIMARY KEY NOT NULL,
            restaurant_id INT NOT NULL REFERENCES restaurants(id),
            name VARCHAR(50) NOT NULL,
            review TEXT NOT NULL,
            rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE restaurants;
    `)
};
