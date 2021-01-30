CREATE DATABASE Odyssey;

USE Odyssey;

create table MusicData(
trackid int,
nombre_cancion varchar(60),
nombre_artista varchar(30),
nombre_album varchar(20)
);

Select * from MusicData;

create table Users(
Userid int auto_increment,
UserEmail varchar(60),
UserRole varchar(10) DEFAULT 'User',
primary key (Userid)
);

Select * from Users;

-- Obtiene todas las canciones (Nombre, Album, Artista)
CREATE PROCEDURE GetAll()
	SELECT M.trackid, M.nombre_cancion, M.nombre_artista, M.nombre_album
    FROM MusicData AS M;
    
    -- WHERE M.id_album = A.id_album AND A.id_artista = Ar.id_artista;

-- Obtiene informacion segun el dato ingresado (Revisa Nombre Cancion, Artista y Album)
CREATE PROCEDURE GetCancion (dato varchar(50))
	SELECT M.nombre_cancion, M.nombre_album, M.nombre_artista
    FROM MusicData AS M
    WHERE (M.nombre_cancion LIKE Concat('%',dato,'%') OR 
    M.nombre_artista LIKE Concat('%',dato,'%') OR
    M.nombre_album LIKE Concat('%',dato,'%'));

-- Elimina una cancion segun la data ingresada
CREATE PROCEDURE deleteSong (dato varchar(50))
	DELETE FROM MusicData
    WHERE nombre_cancion = dato AND trackid > 0;
    
    
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
    
CREATE PROCEDURE UserExists(umail varchar(60))
	SELECT EXISTS(SELECT * from Users WHERE UserEmail = umail);