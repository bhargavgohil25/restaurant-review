-- Table for Restaurant

CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    price_range INTEGER NOT NULL,
    text_token tsvector
);

-- Table For all the Reviews

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    restaurant_id INT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- Count  according to the location

select location, count(location) from restaurants group by location;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;





-- create indexing on the Text Token
CREATE INDEX token_idx ON restaurants(text_token);

-- SELECT name, location FROM example WHERE text_token @@ to_tsquery('Burger');


-- Trigger Function on changing or updating the row
CREATE FUNCTION ts_vector_trigger() RETURNS trigger as $$
BEGIN
	
	new.text_token := 
		to_tsvector(new.name || ' ' || new.location);
	
	RETURN NEW;
END

$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvector_trigger BEFORE INSERT OR UPDATE
	ON restaurants FOR EACH ROW EXECUTE PROCEDURE ts_vector_trigger();

-- For Dropping a trigger
-- DROP TRIGGER tsvector_trigger ON example;






