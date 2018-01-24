INSERT INTO Users (username, password, createdAt, updatedAt) VALUES ("Matt", "body test", NOW(), NOW());
INSERT INTO Users (username, password, createdAt, updatedAt) VALUES ("Jaxin", "body test", NOW(), NOW());
INSERT INTO Users (username, password, createdAt, updatedAt) VALUES ("Stephen", "body test", NOW(), NOW());

INSERT INTO Ratings (item, category, rating, comment, createdAt, updatedAt, UserId) VALUES ("Mike Hess IPA", "beer", 4.5, "Tasty suds", NOW(), NOW(), 1);
INSERT INTO Ratings (item, category, rating, comment, createdAt, updatedAt, UserId) VALUES ("Halo", "video game", 5, "Fun game", NOW(), NOW(), 2);
INSERT INTO Ratings (item, category, rating, comment, createdAt, updatedAt, UserId) VALUES ("Star Wars The Force Awakens", "movies", 4, "Great movie", NOW(), NOW(), 3);
INSERT INTO Ratings (item, category, rating, comment, createdAt, updatedAt, UserId) VALUES ("Dallas Cowboys", "sports", 5, "Americas Team", NOW(), NOW(), 1);