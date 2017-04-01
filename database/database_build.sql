BEGIN;

DROP TABLE IF EXISTS users, teams, userteam, teamprojects, mentors, usermentor CASCADE;

CREATE TABLE users (
    id                SERIAL     PRIMARY KEY,
    first_name        VARCHAR(64)  NOT NULL,
    middle_name       VARCHAR(64),
    last_name         VARCHAR(64)  NOT NULL,
    github_user_name  VARCHAR(64)  NOT NULL,
    languages         VARCHAR(64)  NOT NULL,
    favorite_hobby    VARCHAR(64)  NOT NULL,
    favorite_book     VARCHAR(64)  NOT NULL,
    profile_img       VARCHAR(64)  NOT NULL
);

INSERT INTO users (first_name, middle_name, last_name, github_user_name, languages, favorite_hobby, favorite_book, profile_img)
VALUES ('Yvonne', '禹彤', 'Liu', 'yvonne-liu', 'English, Mandarin Chinese, some Italian', 'Hiking', 'East of Eden', './assets/profile-pics/yvonne_headshot.jpg'),
       ('Finn', 'Webb Newell', 'Hodgkin', 'finnhodgkin', 'English', 'Climbing', 'The Lacuna', './assets/profile-pics/finn_headshot.jpg'),
       ('Lucy', 'Rose', 'Sabin', 'lucyrose93', 'English, French, Spanish', 'Yoga', 'Alice"s Adventures in Wonderland', './assets/profile-pics/lucy_headshot.jpg'),
       ('Samatar', NULL, 'Axmed', 'samatar26', 'English, Somali, Dutch', 'Weightlifting', 'Het lot van de familie Meijer', './assets/profile-pics/samatar_headshot.jpg'),
       ('Jessica', 'Ruth', 'Salmon', 'bo-bok', 'British, Russian', 'Reading', 'Brothers Karamazov', './assets/profile-pics/jessica_headshot.jpg'),
       ('Alexis', NULL, 'Lui', 'alexis-l8', 'English, Cantonese, Spanish, Japanese, Mandarin, Esperanto', 'Squash', 'Harry Potter', './assets/profile-pics/alexis_headshot.jpg'),
       ('Alice', 'Eleanor', 'Carr', 'ConchobarMacNessa', 'English/Mandarin', 'Drawing', 'Steppenwolf', './assets/profile-pics/alice_headshot.jpg'),
       ('Oliver', 'James', 'Phillips', 'oliverjam', 'English', 'JavaScript', 'JavaScript: The Good Parts', './assets/profile-pics/oliver_headshot.jpg'),
       ('Maja', 'M', 'Kudlicka', 'majakudlicka', 'English, Polish, Broken German, Spanish and French', 'Travelling', 'Harry Potter', './assets/profile-pics/maja_headshot.jpg'),
       ('Akin', 'Mariah', 'Sowemimo', 'akin909', 'English, French', 'Coding', 'Love in the Time of Cholera', './assets/profile-pics/akin_headshot.jpg'),
       ('Piotr', NULL, 'Berebecki', 'PiotrBerebecki', 'English', 'Watering flowers', 'Advanced Watering Flowers Techniques for Beginners', './assets/profile-pics/piotr_headshot.jpg'),
       ('Joey', 'Louise', 'Scott', 'joeylouise', 'English, Spanish', 'Singing', 'In Cold Blood', './assets/profile-pics/joey_headshot.jpg'),
       ('Philippa', NULL, 'Bywater', 'pbywater', 'English, French','Coding', 'The Famished Road', './assets/profile-pics/philippa_headshot.jpg'),
       ('Martha', NULL, 'Ciobaniuc', 'smarthutza', 'English, Romanian, Spanish, German', 'Dancing', 'Too many', './assets/profile-pics/martha_headshot.jpg'),
       ('Antonio', NULL, 'Trabalza', 'antoniotrkdz', 'Italian, English', 'LINUX, Coding and Keyboards', 'ABC of Economics', './assets/profile-pics/antonio_headshot.jpg'),
       ('Zooey', 'Ben', 'Miller', 'zooeymiller', 'English', 'Cycling', 'The Myth of Sisyphus', './assets/profile-pics/zooey_headshot.jpg');

CREATE TABLE teams (
    id            SERIAL    PRIMARY KEY,
    team_names    VARCHAR(64)  NOT NULL
);

CREATE TABLE userteam (
    user_id       INTEGER REFERENCES users(id),
    team_id       INTEGER REFERENCES teams(id)
);

CREATE TABLE teamprojects (
    id               SERIAL       PRIMARY KEY,
    team_id          INTEGER REFERENCES teams(id),
    project_names    VARCHAR(64)  NOT NULL,
    project_url      VARCHAR(64)  NOT NULL
);

COMMIT;
