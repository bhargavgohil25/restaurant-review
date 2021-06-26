-- Table for Restaurant

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    price_range INTEGER NOT NULL
);

-- Table For all the Reviews

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    restaurant_id INT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);


-- Count  according to the location

select location, count(location) from restaurants group by location;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;
