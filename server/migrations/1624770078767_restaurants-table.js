/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE restaurants (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            location VARCHAR(100) NOT NULL,
            price_range INTEGER NOT NULL
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE restaurants;
    `)
};


