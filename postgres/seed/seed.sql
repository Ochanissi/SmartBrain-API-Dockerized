BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');

INSERT INTO login (hash, email) VALUES ('$2y$12$g/kRwFUHBtoOMYu1iiHxVefYymA/7GXQA6lBZaAn8/RodCDcv6tE.', 'jessie@gmail.com');

COMMIT;