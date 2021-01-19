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

create table MusicData(
trackid int,
title varchar(60),
artist varchar(30),
album varchar(20),
genre varchar(60),
lenght varchar(10))

Select * from MusicData;

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

-- Obtiene todas las canciones (Nombre, Album, Artista)
CREATE PROCEDURE GetAll ()
	SELECT C.nombre_cancion, A.nombre_album, Ar.nombre_artista
    FROM cancion AS C, album AS A, artista AS Ar
    WHERE C.id_album = A.id_album AND A.id_artista = Ar.id_artista;

-- Obtiene informacion segun el dato ingresado (Revisa Nombre Cancion, Artista y Letra Cancion)
CREATE PROCEDURE GetCancion (dato varchar(50))
	SELECT C.nombre_cancion, A.nombre_album, Ar.nombre_artista
    FROM cancion AS C, album AS A, artista AS Ar
    WHERE C.id_album = A.id_album AND A.id_artista = Ar.id_artista AND 
    (C.nombre_cancion LIKE Concat('%',dato,'%') OR 
    Ar.nombre_artista LIKE Concat('%',dato,'%') OR
    C.letra LIKE Concat('%',dato,'%'));

-- Elimina una cancion segun la data ingresada
CREATE PROCEDURE deleteSong (dato varchar(50))
	DELETE FROM cancion 
    WHERE nombre_cancion = dato AND id_album > 0;

-- Revisa si existe el artista. Si no existe lo crea
DELIMITER //
CREATE PROCEDURE checkArtista (param1 varchar(50), OUT param2 INT)
BEGIN
    IF (SELECT COUNT(*) FROM artista AS Ar WHERE ar.nombre_artista = param1) > 0 THEN
        SET param2 = (SELECT ar.id_artista FROM artista AS Ar WHERE ar.nombre_artista = param1);
    ELSE
        INSERT INTO artista (nombre_artista) VALUES (param1);
        SET param2 = (SELECT ar.id_artista FROM artista AS Ar WHERE ar.nombre_artista = param1);
    END IF;
END //

-- Revisa si existe ese album de ese artista. Si no existe lo crea
DELIMITER //
CREATE PROCEDURE checkAlbum (param_id INT, param_nombre varchar(50), param_image varchar(100), OUT outparamalbum INT)
BEGIN
    IF (SELECT COUNT(*) FROM album AS A WHERE a.nombre_album = param_nombre AND a.id_artista = param_id) > 0 THEN
        SET outparamalbum = (SELECT id_album FROM album AS A WHERE a.nombre_album = param_nombre AND a.id_artista = param_id);
    ELSE
        INSERT INTO album (id_artista, nombre_album, imagen) VALUES (param_id, param_nombre, param_image);
        SET outparamalbum = (SELECT id_album FROM album AS A WHERE a.nombre_album = param_nombre AND a.id_artista = param_id);
    END IF;
END //

-- Revisa si existe esa cancion de ese album. Si no existe lo crea
DELIMITER //
CREATE PROCEDURE checkCancion (param_id INT, param_nombre varchar(50), param_letra varchar(500))
BEGIN
    IF (SELECT COUNT(*) FROM cancion AS C WHERE c.nombre_cancion = param_nombre AND c.id_album = param_id) = 0 THEN
        INSERT INTO cancion (id_album, nombre_cancion, letra) VALUES (param_id, param_nombre, param_letra);
    END IF;
END //

-- call odyssey.checks('AC/DC', 'Highway to Hell', '', 'Get It Hot', '');
-- Realiza todos los checks de una forma mas facil
DELIMITER //
CREATE PROCEDURE checks (p_artista varchar(50),p_album varchar(50),p_imagen varchar(100),p_cancion varchar(50),p_letra varchar(500))
BEGIN
	call odyssey.checkArtista(p_artista, @param2);
	call odyssey.checkAlbum(@param2, p_album, p_imagen, @outparamalbum);
    call odyssey.checkCancion(@outparamalbum, p_cancion, p_letra);
END //
