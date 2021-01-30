CREATE DEFINER=`root`@`localhost` PROCEDURE `AddSong`(
	IN _id INT,
    IN _nombre_cancion VARCHAR(150),
    IN _nombre_artista VARCHAR(150),
    IN _nombre_album VARCHAR(150)
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO MusicData (nombre_cancion, nombre_artista, nombre_album)
        VALUES(_nombre_cancion, _nombre_artista, _nombre_album);
        SET _id = LAST_INSERT_ID();
	END IF;
    
    SELECT _id AS id;
END