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

-- Obtiene todas las canciones (Nombre, Album, Artista)
CREATE PROCEDURE GetAll ()
	SELECT M.trackid, M.title, M.artist, M.album, M.genre, M.lenght
    FROM MusicData AS M;
    
    -- WHERE M.id_album = A.id_album AND A.id_artista = Ar.id_artista;

-- Obtiene informacion segun el dato ingresado (Revisa Nombre Cancion, Artista y Album)
CREATE PROCEDURE GetCancion (dato varchar(50))
	SELECT M.title, M.album, M.artist
    FROM MusicData AS M
    WHERE (M.title LIKE Concat('%',dato,'%') OR 
    M.artist LIKE Concat('%',dato,'%') OR
    M.album LIKE Concat('%',dato,'%'));

-- Elimina una cancion segun la data ingresada
CREATE PROCEDURE deleteSong (dato varchar(50))
	DELETE FROM MusicData
    WHERE title = dato AND trackid > 0;

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
