CREATE DATABASE Odyssey;

USE Odyssey;

create table MusicData(
trackid int,
title varchar(60),
artist varchar(30),
album varchar(20),
genre varchar(60),
lenght varchar(10) 
);

Select * from MusicData;

create table Users(
Userid int,
UserName varchar(60),
UserEmail varchar(60),
UserRole varchar(10) DEFAULT 'User'
);

Select * from Users;

-- Obtiene todas las canciones (Nombre, Album, Artista)
CREATE PROCEDURE GetAll()
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
    
    
CREATE PROCEDURE GetUsers()
    SELECT U.Userid, U.UserName, U.UserEmail, U.UserRole
    FROM Users AS U; 

CREATE PROCEDURE GetSingleUser (dato int)
	SELECT U.Userid, U.UserName, U.UserEmail, U.UserRole
    FROM Users AS U
    WHERE U.Userid = dato;
    
CREATE PROCEDURE deleteUser (dato int)
	DELETE FROM Users
    WHERE Userid = dato AND Userid > 0;

CREATE PROCEDURE beAdmin (dato int)
	UPDATE Users
	SET UserRole='Admin'
	WHERE Userid = dato;
    
CREATE PROCEDURE beUser (dato int)
	UPDATE Users
	SET UserRole='User'
	WHERE Userid = dato;
    
CREATE PROCEDURE createUser (dato int, uname varchar(60), umail varchar (60), urole varchar (10))
	insert into Users values (dato,uname,umail,urole);
