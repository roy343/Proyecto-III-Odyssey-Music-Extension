CREATE DATABASE Odyssey;

USE Odyssey;

CREATE TABLE artista (
	id_artista INT NOT NULL AUTO_INCREMENT,
	nombre_artista VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_artista)
);

CREATE TABLE album (
	id_album INT NOT NULL AUTO_INCREMENT,
	id_artista INT NOT NULL,
	nombre_album VARCHAR(50),
	imagen VARCHAR(100),
    PRIMARY KEY (id_album),
    FOREIGN KEY (id_artista) REFERENCES artista(id_artista)
);

CREATE TABLE cancion (
	id_album INT NOT NULL,
	nombre_cancion VARCHAR(50) NOT NULL,
	letra VARCHAR(500),
    PRIMARY KEY (id_album, nombre_cancion),
    FOREIGN KEY (id_album) REFERENCES album(id_album)
);

-- Artistas
-- Metallica   -> 1
-- AC/DC       -> 2
INSERT INTO artista (nombre_artista) VALUES ("Metallica");
INSERT INTO artista (nombre_artista) VALUES ("AC/DC");

-- Albumes
-- Death Magnetic   -> 1
-- Highway to Hell  -> 2
INSERT INTO album (id_artista, nombre_album) VALUES (1,"Death Magnetic");
INSERT INTO album (id_artista, nombre_album) VALUES (2,"Highway to Hell");

-- Canciones del album 1
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"That Was Just Your Life");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"The End of the Line");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"Broken, Beat & Scarred");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"The Day That Never Comes");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"All Nightmare Long");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"Cyanide");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"The Unforgiven III");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"The Judas Kiss");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"Suicide & Redemption");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (1,"My Apocalypse");

-- Canciones del album 2
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Highway to Hell");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Girls Got Rhythm");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Walk All Over You");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Touch Too Much");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Beating Around the Bush");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Shot Down in Flames");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Get It Hot");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"If You Want Blood (You've Got It)");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Love Hungry Man");
INSERT INTO cancion (id_album, nombre_cancion) VALUES (2,"Night Prowler");