-- CREATION TABLES
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(100) NOT NULL CHECK (char_length(firstname) >= 2),
    firstname VARCHAR(100) NOT NULL CHECK (char_length(firstname) >= 2),
    email VARCHAR(250) NOT NULL UNIQUE CHECK (email LIKE '%@%.%'),
    password VARCHAR(280) NOT NULL CHECK (char_length(password) >= 8),
    picture_profil VARCHAR(280),
    registration_date DATE DEFAULT CURRENT_DATE,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

CREATE TABLE picture_garden (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL
);

CREATE TABLE difficulty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    description TEXT NOT NULL,
    score INT NOT NULL CHECK (score BETWEEN 1 AND 5),
    icon VARCHAR(280)
);

CREATE TABLE exposition (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    icon VARCHAR(280) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE localisation (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    icon VARCHAR(280) NOT NULL
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    icon VARCHAR(280)
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    icon VARCHAR(280)
);

CREATE TABLE watering (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    icon VARCHAR(280) NOT NULL,
    description TEXT
);

CREATE TABLE picture_plant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL
);

CREATE TABLE harvest_date (
    id SERIAL PRIMARY KEY,
    start_month INT NOT NULL CHECK (start_month BETWEEN 1 AND 12),
    end_month INT NOT NULL CHECK (start_month BETWEEN 1 AND 12)
);

CREATE TABLE plant_date (
    id SERIAL PRIMARY KEY,
    start_month INT NOT NULL CHECK (start_month BETWEEN 1 AND 12),
    end_month INT NOT NULL CHECK (start_month BETWEEN 1 AND 12)
);

CREATE TABLE sowing_date (
    id SERIAL PRIMARY KEY,
    start_month INT NOT NULL CHECK (start_month BETWEEN 1 AND 12),
    end_month INT NOT NULL CHECK (start_month BETWEEN 1 AND 12)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL UNIQUE
);

CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(280) UNIQUE NOT NULL,
    parent_slug VARCHAR(280),
    name VARCHAR(280) NOT NULL,
    description TEXT NOT NULL,
    space_between VARCHAR(280),
    temperature VARCHAR(280),
    id_difficulty INT REFERENCES difficulty(id) ON DELETE SET NULL, -- "ON DELETE SET NULL" = Préserve les plantes si on supprime une difficulté/exposition/etc.
    id_exposition INT REFERENCES exposition(id) ON DELETE SET NULL,
    id_watering INT REFERENCES watering(id) ON DELETE SET NULL,
    id_picture_plant INT REFERENCES pictures_plant(id) ON DELETE SET NULL,
    id_localisation INT REFERENCES localisation(id)ON DELETE SET NULL
);

-- Tables de relation
CREATE TABLE plant_has_sowing_date (
    id_plant INT NOT NULL,
    id_sowing_date INT NOT NULL,
    PRIMARY KEY (id_plant, id_sowing_date),
    FOREIGN KEY (id_plant) REFERENCES plants(id),
    FOREIGN KEY (id_sowing_date) REFERENCES sowing_date(id_sowing_date)
);

CREATE TABLE plant_has_harvest_date (
    id_plant INT NOT NULL,
    id_harvest_date INT NOT NULL,
    PRIMARY KEY (id_plant, id_harvest_date),
    FOREIGN KEY (id_plant) REFERENCES plants(id),
    FOREIGN KEY (id_harvest_date) REFERENCES harvest_date(id_harvest_date)
);

CREATE TABLE plant_has_plant_date (
    id_plant INT NOT NULL,
    id_plant_date INT NOT NULL,
    PRIMARY KEY (id_plant, id_plant_date),
    FOREIGN KEY (id_plant) REFERENCES plants(id),
    FOREIGN KEY (id_plant_date) REFERENCES plant_date(id_plant_date)
);

CREATE TABLE plant_has_tag (
    id_plant INT NOT NULL,
    id_tag INT NOT NULL,
    PRIMARY KEY (id_plant, id_tag),
    FOREIGN KEY (id_plant) REFERENCES plants(id),
    FOREIGN KEY (id_tag) REFERENCES tags(id)
);

CREATE TABLE plant_has_category (
    id_plant INT NOT NULL,
    id_category INT NOT NULL,
    PRIMARY KEY (id_plant, id_category),
    FOREIGN KEY (id_plant) REFERENCES plants(id),
    FOREIGN KEY (id_category) REFERENCES category(id)
);

CREATE TYPE niveau_toxicite_enum AS ENUM ('Faible', 'Modéré', 'Élevé');
CREATE TABLE plant_has_toxic_pet (
    id_plant INT NOT NULL,
    id_pet INT NOT NULL,
    niveau_toxicite niveau_toxicite_enum NOT NULL,
    PRIMARY KEY (id_plant, id_pet),
    FOREIGN KEY (id_plant) REFERENCES plants(id),
    FOREIGN KEY (id_pet) REFERENCES pets(id)
);

-- Tables garden 
CREATE TABLE gardens (
    id SERIAL PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    description TEXT,
    created_at DATE DEFAULT CURRENT_DATE,
    id_user INT NOT NULL,
    id_localisation INT,
    id_picture_garden INT,
    id_difficulty INT,
    id_exposition INT,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_localisation) REFERENCES localisation(id),
    FOREIGN KEY (id_picture_garden) REFERENCES picture_garden(id),
    FOREIGN KEY (id_difficulty) REFERENCES difficulty(id),
    FOREIGN KEY (id_exposition) REFERENCES exposition(id)
);

CREATE TABLE garden_has_pet (
    id_garden INT NOT NULL,
    id_pet INT NOT NULL,
    PRIMARY KEY (id_garden, id_pet),
    FOREIGN KEY (id_garden) REFERENCES gardens(id),
    FOREIGN KEY (id_pet) REFERENCES pets(id)
);

CREATE TABLE garden_has_plant (
    id_garden INT NOT NULL,
    id_plant INT NOT NULL,
    PRIMARY KEY (id_garden, id_plant),
    FOREIGN KEY (id_garden) REFERENCES gardens(id),
    FOREIGN KEY (id_plant) REFERENCES plants(id)
);

CREATE TABLE user_has_favory (
    id_user INT NOT NULL,
    id_plant INT NOT NULL,
    PRIMARY KEY (id_user, id_plant),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_plant) REFERENCES plants(id)
);

-- DATAS
INSERT INTO users (lastname, firstname, email, password, picture_profil, role)
VALUES
    ('Dupont', 'Admin', 'admin@admin.com', 'admin', 'default.jpg', 'admin'),
    ('Durand', 'Alex', 'user2@test.com', '123456789', 'alex.jpg', 'user'),
    ('Martin', 'Sophie', 'user3@test.com', '123456789', 'sophie.jpg', 'user'),
    ('Bernard', 'Lucas', 'user4@test.com', '123456789', 'lucas.jpg', 'user'),
    ('Thomas', 'Emma', 'user5@test.com', '123456789', 'emma.jpg', 'user'),
    ('Petit', 'Noah', 'user6@test.com', '123456789', 'noah.jpg', 'user'),
    ('Robert', 'Léa', 'user7@test.com', '123456789', 'lea.jpg', 'user'),
    ('Richard', 'Hugo', 'user8@test.com', '123456789', 'hugo.jpg', 'user'),
    ('Durand', 'Chloé', 'user9@test.com', '123456789', 'chloe.jpg', 'user'),
    ('Lefebvre', 'Camille', 'user10@test.com', '123456789', 'mathis.jpg', 'user');

INSERT INTO picture_garden (name)
VALUES
    ('balcon-ensoleille.jpg'),
    ('jardin-urbain.jpg');

INSERT INTO difficulty (name, description, score, icon)
VALUES
    ('Débutant(e) maladroit(e)', 'Vous avez déjà tenté… mais vos plantes ne survivent pas longtemps. Vous cherchez des espèces très résistantes.', 1, 'debutant-icon.png'),
    ('Jardinier(ère) occasionnel(le)', 'Vous avez quelques réussites à votre actif. Vous connaissez les bases, mais vous restez prudent(e).', 2, 'moyen-icon.png'),
    ('Jardinier(ère) confirmé(e)', 'Vous savez entretenir et faire prospérer vos plantes. Vous êtes à l’aise pour tester des associations ou des variétés plus exigeantes.', 3, 'expert-icon.png');

INSERT INTO exposition (name, icon, description)
VALUES
    ('Ombre', 'ombre-icon.png', 'exposition inférieure à ? heures'),
    ('Mi-ombre', 'mi-ombre-icon.png', 'exposition inférieure à ? heures'),
    ('Plein soleil', 'soleil-icon.png', 'exposition supérieure à ? heures');

INSERT INTO localisation (name, icon)
VALUES
    ('Intérieur', 'interieur-icon.png'),
    ('Extérieur', 'exterieur-icon.png'),
    ('Les deux', 'int-ext-icon.png');

INSERT INTO pets (name, icon)
VALUES
    ('Chat', 'chat-icon.png'),
    ('Chien', 'chien-icon.png'),
    ('Rongeur', 'rongeur-icon.png'),
    ('Oiseau', 'oiseau-icon.png'),
    ('Reptile', 'reptile-icon.png'),
    ('Aucun', 'aucun-icon.png');

INSERT INTO category (name, icon)
VALUES
    ('Aromatique', 'aromatique_icon.png'),
    ('Potagère', 'potagere-icon.png'),
    ('Fruitière', 'fruitiere-icon.png'),
    ('Ornementale', 'ornementale-icon.png');

INSERT INTO watering (name, icon, description)
VALUES
    ('Faible', 'water1-icon.png', 'Arrosage occasionnel, sol sec entre deux arrosages (1 fois / semaine voire moins)'),
    ('Modéré', 'water2-icon.png', 'Sol légèrement humide en permanence, arrosage régulier (2–3 fois / semaine)'),
    ('Très élevé / exigeant', 'water3-icon.png', 'Arrosage quasi quotidien, souvent en pot petit / exposition plein soleil');

INSERT INTO picture_plant (name)
VALUES
    ('tomate.jpg'),
    ('tomates-coeur-de-boeuf.jpg'),
    ('tomate-cerise.jpg'),
    ('tomate-allongee.jpg'),
    ('fraises.jpg'),
    ('fraise-gariguette.jpg'),
    ('fraise-charlotte.jpg'),
    ('fraise-mara-des-bois.jpg'),
    ('courgette.jpg'),
    ('courgette-jaune.jpg'),
    ('courgette-ronde-de-nice.jpg'),
    ('basilic.jpg'),
    ('concombre.jpg'),
    ('persil.jpg'),
    ('salade.jpg'),
    ('carotte.jpg'),
    ('thym.jpg'),
    ('menthe-verte.jpg'),
    ('romarin.jpg'),
    ('ciboulette.jpg'),
    ('poivron.jpg'),
    ('radis.jpg'),
    ('oseille.jpg'),
    ('sauge.jpg'),
    ('lavande.jpg'),
    ('coriandre.jpg'),
    ('poireau.jpg'),
    ('aubergines.jpg');

INSERT INTO harvest_date (start_month, end_month)
VALUES
    (5, 6),
    (6, 8),
    (7, 9),
    (9, 10),
    (10, 11);

INSERT INTO plant_date (start_month, end_month)
VALUES
    (1, 2),
    (4, 6),
    (11, 12),
    (3, 7),
    (7, 9);

INSERT INTO sowing_date (start_month, end_month)
VALUES
    (5, 6),
    (3, 5),
    (10, 12),
    (1, 3),
    (7, 9);

INSERT INTO tags (name)
VALUES
    ('fruit'),
    ('légume'),
    ('aromatique'),
    ('plante-facile'),
    ('plante-exigeante'),
    ('intérieur'),
    ('extérieur'),
    ('soleil'),
    ('ombre'),
    ('mi-ombre');

INSERT INTO plants 
(slug, parent_slug, name, description, space_between, temperature, id_difficulty, id_exposition, id_watering, id_picture_plant, id_localisation)
VALUES
    (
        'tomate',
        NULL,
        'Tomate',
        'Le must du potager si vous avez un peu d’espace et de la lumière. Largement répandues dans notre alimentation, les tomates sont faciles à cultiver, produisent beaucoup et vous permettront de faire des économies. Selon la variété, elles peuvent offrir des fruits ronds, allongés ou en grappe, parfaits pour les salades, les sauces ou à déguster simplement au soleil.',
        '50-60cm',
        '18-28°C (tolérance jusqu''à 35°C)',
        2,
        3,
        2,
        1,
        2
    ),
    (
        'tomate-coeur-de-boeuf',
        'tomate',
        'Tomate Cœur de bœuf',
        'Variété ancienne à gros fruits charnus et parfumés. Elle est facile à cultiver et produit généreusement si le sol est riche et bien arrosé, idéale pour les amateurs de salades gourmandes.',
        '50-60cm',
        '18-28°C',
        2,
        3,
        2,
        2,
        2
    ),
    (
        'tomate-cerise',
        'tomate',
        'Tomate Cerise',
        'Petite, sucrée et très productive, la tomate cerise se plaît au soleil et ravira petits et grands. Elle est parfaite à grignoter directement du jardin ou à ajouter dans vos salades estivales.',
        '40-50cm',
        '18-28°C',
        1,
        3,
        2,
        3,
        2
    ),
    (
        'tomate-allongee',
        'tomate',
        'Tomate Allongée',
        'Idéale pour les sauces et conserves, cette variété offre des fruits fermes et parfumés. Facile à cultiver, elle demande un sol riche et un arrosage régulier.',
        '50-60cm',
        '18-28°C',
        2,
        3,
        2,
        4,
        2
    ),
    (
        'fraise',
        NULL,
        'Fraise',
        'La fraise est le fruit rouge emblématique du jardin. Facile à cultiver, elle aime un sol frais et une exposition ensoleillée ou mi-ombragée. Elle offre des fruits sucrés et juteux à déguster frais, en desserts ou en confitures maison.',
        '30-40cm',
        '10-25°C',
        1,
        2,
        2,
        5,
        2
    ),
    (
        'fraise-gariguette',
        'fraise',
        'Fraise Gariguette',
        'Variété précoce et parfumée, aux fruits rouges allongés et sucrés. Elle est idéale pour les amateurs de fraises au goût intense et délicat.',
        '30-40cm',
        '10-25°C',
        1,
        2,
        2,
        6,
        2
    ),
    (
        'fraise-charlotte',
        'fraise',
        'Fraise Charlotte',
        'Variété remontante très productive. Ses fruits fermes et sucrés raviront petits et grands, parfaite pour consommer directement ou en desserts.',
        '30-40cm',
        '10-25°C',
        1,
        2,
        2,
        7,
        2
    ),
    (
        'fraise-mara-des-bois',
        'fraise',
        'Fraise Mara des bois',
        'Très parfumée et sucrée, cette variété rappelle le goût des fraises des bois. Elle est idéale pour les desserts raffinés et les amateurs de saveurs intenses.',
        '30-40cm',
        '10-25°C',
        1,
        2,
        2,
        8,
        2
    ),
    (
        'courgette',
        NULL,
        'Courgette',
        'Plante généreuse et facile à cultiver. Elle se plaît dans un sol riche et bien arrosé, au soleil. Ses fruits tendres se récoltent jeunes et peuvent être cuisinés de mille façons, en gratins, sautés ou farcis.',
        '80-100cm',
        '18-30°C',
        1,
        3,
        3,
        9,
        2
    ),
    (
        'courgette-jaune',
        'courgette',
        'Courgette Jaune',
        'Douce et colorée, cette variété apporte de la variété au jardin et à l’assiette. Très productive, elle se récolte jeune pour conserver sa tendreté.',
        '80-100cm',
        '18-30°C',
        1,
        3,
        3,
        10,
        2
    ),
    (
        'courgette-ronde-de-nice',
        'courgette',
        'Courgette Ronde de Nice',
        'Variété ronde idéale pour farcir et cuisiner, très productive et facile à cultiver. Ses fruits ont une chair tendre et douce.',
        '80-100cm',
        '18-30°C',
        1,
        3,
        3,
        11,
        2
    ),
    (
        'basilic',
        NULL,
        'Basilic',
        'Plante aromatique au parfum intense, facile à cultiver. Elle se plaît au soleil et dans un sol léger et bien drainé. Idéal pour parfumer vos plats méditerranéens.',
        '25cm',
        '18-30°C',
        1,
        3,
        2,
        12,
        2
    ),
    (
        'concombre',
        NULL,
        'Concombre',
        'Plante grimpante ou rampante qui adore la chaleur et l’humidité. Les fruits croquants sont parfaits pour les salades et se récoltent régulièrement pour stimuler la production.',
        '80cm',
        '18-30°C',
        2,
        3,
        3,
        13,
        2
    ),
    (
        'persil',
        NULL,
        'Persil',
        'Facile à cultiver et très aromatique, le persil aime les sols frais et la mi-ombre. Il se récolte tout au long de la saison pour parfumer vos plats.',
        '20cm',
        '12-25°C',
        1,
        2,
        2,
        14,
        2
    ),
    (
        'laitue',
        NULL,
        'Laitue',
        'Plante à croissance rapide, idéale pour récoltes fréquentes. Préfère un sol frais et un emplacement mi-ombragé. Ses feuilles tendres se dégustent crues en salade.',
        '25-30cm',
        '10-20°C',
        1,
        2,
        2,
        15,
        2
    ),
    (
        'carotte',
        NULL,
        'Carotte',
        'Plante racine facile à cultiver dans un sol léger et profond. Les racines sucrées se récoltent à maturité et apportent couleur et goût à vos plats.',
        '4-6cm',
        '16-24°C',
        2,
        3,
        1,
        16,
        2
    ),
    (
        'thym',
        NULL,
        'Thym',
        'Aromatique rustique et parfumée, elle aime le plein soleil et les sols bien drainés. Ses feuilles sont idéales pour assaisonner viandes, sauces et légumes.',
        '30cm',
        '12-30°C',
        1,
        3,
        1,
        17,
        2
    ),
    (
        'menthe',
        NULL,
        'Menthe',
        'Plante vivace très parfumée, facile à cultiver. Elle aime la fraîcheur et se plaît dans des sols humides. Attention à sa propagation rapide !',
        '40cm',
        '12-28°C',
        1,
        2,
        3,
        18,
        2
    ),
    (
        'romarin',
        NULL,
        'Romarin',
        'Arbustif aromatique méditerranéen, rustique et parfumé. Il aime le plein soleil et la sécheresse, parfait pour parfumer plats et grillades.',
        '50cm',
        '12-30°C',
        1,
        3,
        1,
        19,
        2
    ),
    (
        'ciboulette',
        NULL,
        'Ciboulette',
        'Plante vivace facile à cultiver, elle repousse chaque année. Idéale pour assaisonner salades, omelettes et plats frais.',
        '20-25cm',
        '8-25°C',
        1,
        2,
        2,
        20,
        2
    ),
    (
        'poivron',
        NULL,
        'Poivron',
        'Plante très productive, nécessitant chaleur et arrosage régulier. Ses fruits colorés se dégustent crus ou cuits.',
        '50cm',
        '20-30°C',
        3,
        3,
        2,
        21,
        2
    ),
    (
        'radis',
        NULL,
        'Radis',
        'Croissance rapide, idéal pour débutants. Il se récolte en quelques semaines et offre un goût piquant et croquant.',
        '2-4cm',
        '12-20°C',
        1,
        2,
        2,
        22,
        2
    ),
    (
        'oseille',
        NULL,
        'Oseille',
        'Plante à feuilles acidulées, facile à cultiver. Elle préfère mi-ombre et sol frais, idéale pour les soupes et sauces.',
        '30cm',
        '12-22°C',
        1,
        2,
        2,
        23,
        2
    ),
    (
        'sauge',
        NULL,
        'Sauge',
        'Aromatique rustique et parfumée, elle aime le plein soleil et la sécheresse. Parfaite pour assaisonner viandes et sauces.',
        '40cm',
        '15-30°C',
        1,
        3,
        1,
        24,
        2
    ),
    (
        'lavande',
        NULL,
        'Lavande',
        'Arbuste méditerranéen, parfumé et rustique. Il aime le soleil et les sols drainés, idéal pour parfumer le jardin et créer une ambiance méditerranéenne.',
        '40-50cm',
        '15-30°C',
        1,
        3,
        1,
        25,
        2
    ),
    (
        'coriandre',
        NULL,
        'Coriandre',
        'Facile à cultiver, elle aime la fraîcheur et un sol léger. Ses feuilles parfumées relèvent salades, sauces et plats exotiques.',
        '20cm',
        '10-22°C',
        2,
        2,
        2,
        26,
        2
    ),
    (
        'poireau',
        NULL,
        'Poireau',
        'Plante rustique, facile à cultiver. Ses tiges longues et tendres sont idéales pour soupes, quiches et plats mijotés.',
        '10-15cm',
        '12-20°C',
        2,
        2,
        2,
        27,
        2
    ),
    (
        'aubergine',
        NULL,
        'Aubergine',
        'Plante exigeante en chaleur mais très productive. Ses fruits brillants et savoureux se cuisinent grillés, farcis ou en ratatouille.',
        '50-60cm',
        '22-30°C',
        3,
        3,
        2,
        28,
        2
    );

INSERT INTO plant_has_sowing_date (id_plant, id_sowing_date) 
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 2),
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 1),
    (10, 1),
    (11, 1),
    (12, 2),
    (13, 1),
    (14, 2),
    (15, 2),
    (16, 2),
    (17, 2),
    (18, 5),
    (19, 5),
    (20, 2),
    (21, 1),
    (22, 3),
    (23, 3),
    (24, 5),
    (25, 4),
    (26, 3),
    (27, 4),
    (28, 1);

INSERT INTO plant_has_harvest_date (id_plant, id_harvest_date) 
VALUES
    (1, 3),
    (2, 3),
    (3, 3),
    (4, 3),
    (5, 2),
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 2),
    (10, 2),
    (11, 2),
    (12, 2),
    (13, 3),
    (14, 2),
    (15, 2),
    (16, 4),
    (17, 5),
    (18, 5),
    (19, 5),
    (20, 2),
    (21, 3),
    (22, 3),
    (23, 4),
    (24, 5),
    (25, 5),
    (26, 4),
    (27, 5),
    (28, 3);

INSERT INTO plant_has_plant_date (id_plant, id_plant_date) 
VALUES
    (1, 2),
    (2, 2),
    (3, 2),
    (4, 2),
    (5, 4),
    (6, 4),
    (7, 4),
    (8, 4),
    (9, 2),
    (10, 2),
    (11, 2),
    (12, 4),
    (13, 2),
    (14, 4),
    (15, 4),
    (16, 4),
    (17, 4),
    (18, 5),
    (19, 5),
    (20, 4),
    (21, 2),
    (22, 4),
    (23, 4),
    (24, 5),
    (25, 4),
    (26, 4),
    (27, 4),
    (28, 2);

INSERT INTO plant_has_tag (id_plant, id_tag) 
VALUES
    (1, 1),
    (1, 4),
    (1, 7),
    (1, 8),
    (2, 1),
    (2, 5),
    (2, 7),
    (2, 8),
    (3, 1),
    (3, 4),
    (3, 7),
    (3, 8),
    (4, 1),
    (4, 5),
    (4, 7),
    (4, 8),
    (5, 1),
    (5, 4),
    (5, 7),
    (5, 8),
    (5, 10),
    (6, 1),
    (6, 4),
    (6, 7),
    (6, 8),
    (6, 10),
    (7, 1),
    (7, 4),
    (7, 7),
    (7, 8),
    (7, 10),
    (8, 1),
    (8, 4),
    (8, 7),
    (8, 8),
    (8, 10),
    (9, 2),
    (9, 4),
    (9, 7),
    (9, 8),
    (10, 2),
    (10, 4),
    (10, 7),
    (10, 8),
    (11, 2),
    (11, 4),
    (11, 7),
    (11, 8),
    (12, 3),
    (12, 4),
    (12, 7),
    (12, 8),
    (13, 2),
    (13, 5),
    (13, 7),
    (13, 8),
    (14, 3),
    (14, 4),
    (14, 7),
    (14, 10),
    (15, 2),
    (15, 4),
    (15, 7),
    (15, 10),
    (16, 2),
    (16, 4),
    (16, 7),
    (16, 8),
    (17, 3),
    (17, 4),
    (17, 7),
    (17, 8),
    (18, 3),
    (18, 4),
    (18, 7),
    (18, 10),
    (19, 3),
    (19, 5),
    (19, 7),
    (19, 8),
    (20, 3),
    (20, 4),
    (20, 7),
    (20, 10),
    (21, 2),
    (21, 5),
    (21, 7),
    (21, 8),
    (22, 2),
    (22, 4),
    (22, 7),
    (22, 10),
    (23, 3),
    (23, 4),
    (23, 7),
    (23, 10),
    (24, 3),
    (24, 5),
    (24, 7),
    (24, 8),
    (25, 3),
    (25, 5),
    (25, 7),
    (25, 8),
    (26, 3),
    (26, 4),
    (26, 7),
    (26, 10),
    (27, 2),
    (27, 4),
    (27, 7),
    (27, 10),
    (28, 2),
    (28, 5),
    (28, 7),
    (28, 8);

INSERT INTO plant_has_category (id_plant, id_category) 
VALUES
    (1, 3),
    (2, 3),
    (3, 3),
    (4, 3),
    (5, 3),
    (6, 3),
    (7, 3),
    (8, 3),
    (9, 2),
    (10, 2),
    (11, 2),
    (12, 1),
    (13, 2),
    (14, 1),
    (15, 2),
    (16, 2),
    (17, 1),
    (18, 1),
    (19, 1),
    (20, 1),
    (21, 2),
    (22, 2),
    (23, 1),
    (24, 1),
    (25, 1),
    (26, 1),
    (27, 2),
    (28, 2);

INSERT INTO plant_has_toxic_pet (id_plant, id_pet, niveau_toxicite) 
VALUES
    (12, 1, 'Modéré'),
    (12, 2, 'Modéré'),
    (17, 1, 'Modéré'),
    (17, 2, 'Modéré'),
    (18, 1, 'Modéré'),
    (18, 2, 'Modéré'),
    (19, 1, 'Modéré'),
    (19, 2, 'Modéré'),
    (21, 1, 'Modéré'),
    (21, 2, 'Modéré'),
    (24, 1, 'Modéré'),
    (24, 2, 'Modéré'),
    (25, 1, 'Modéré'),
    (25, 2, 'Modéré'),
    (28, 1, 'Modéré'),
    (28, 2, 'Modéré');

INSERT INTO gardens (name, description, created_at, id_user, id_localisation, id_picture_garden, id_difficulty, id_exposition) 
VALUES
    (
        'Jardin Balcon Est',
        'Chambre étage Gauche',
        '2025-11-09T10:00:00Z',
        1,
        2,
        1,
        2,
        3
    ),
    (
        'Jardin Chambre Lulu',
        'Petit jardin côté chambre lucie.',
        '2025-11-11T09:00:00Z',
        1,
        2,
        2,
        1,
        2
    );

INSERT INTO garden_has_pet (id_garden, id_pet)
VALUES 
    (1, 1);

INSERT INTO garden_has_plant (id_garden, id_plant)
VALUES 
    (1, 1),
    (1, 3),
    (1, 5),
    (1, 8),
    (2, 12),
    (2, 14),
    (2, 22),
    (2, 26);

INSERT INTO user_has_favory (id_user, id_plant)
VALUES
    (1, 12),
    (1, 17),
    (1, 19),
    (2, 1),
    (2, 2),
    (2, 3),
    (3, 5),
    (3, 6),
    (3, 7),
    (4, 9),
    (4, 10),
    (4, 13),
    (5, 14),
    (5, 18),
    (5, 20),
    (6, 16),
    (6, 22),
    (6, 27),
    (7, 24),
    (7, 23),
    (7, 21),
    (8, 19),
    (8, 25),
    (8, 12),
    (9, 26),
    (9, 20),
    (9, 18),
    (10, 1),
    (10, 3),
    (10, 17),
    (10, 14);
