# Proyecto-III-Odyssey-Music-Extension
Proyecto III del curso de Algortimos y bases de datos

<br>

# Configuración de entorno
## Base de Datos
* Se debe instalar MySql y MySql workbench antes de poder crear la base de datos
* Para incializar la base de datos, se debe resaltar la parte del script en MySQL workbench que se desea ejecutar. Para crear la base de datos, seleccionamos lo siguiente:

![image](https://github.com/roy343/Proyecto-III-Odyssey-Music-Extension/blob/main/Wiki/1.PNG)

* Seguidamente se repite el proceso de resaltar y ejecutar para "USE Odyssey"
* Se repite el proceso, esta vez sin embargo se resalta el "create table" y todo su contenido hasta el punto y coma. Son 2 tablas asi que se debe hacer esto con ambas (MusicData y Users)
* Si todo sale correctamente, debería aparecer lo siguiente en workbench:

![image](https://github.com/roy343/Proyecto-III-Odyssey-Music-Extension/blob/main/Wiki/2.PNG)

* Si no es el caso, es posible que se necesite refrescar la ventana de schemas
* Para cargar la base de datos de la música con las canciones, se debe dar click derecho en la tabla de MusicData en la ventana de schemas, ahi, debe seleccionarse la opción "Table Data Import Wizard". Esta ventana aparecerá:

![image](https://github.com/roy343/Proyecto-III-Odyssey-Music-Extension/blob/main/Wiki/3.PNG)

* Se selecciona la opción "Browse" y se elige el archivo "MetaDataCsv", el cual se encuentra en la carpeta "Base de Datos" del proyecto.
* Una vez seleccionado se selecciona "next"
* Esta ventana aparecerá:

![image](https://github.com/roy343/Proyecto-III-Odyssey-Music-Extension/blob/main/Wiki/4.PNG)

* Se da click a "next"
* Esta ventana aparecerá:

![image](https://github.com/roy343/Proyecto-III-Odyssey-Music-Extension/blob/main/Wiki/5.PNG)}

* Se debe revisar que los nombres de las columnas coincidan, si es el caso, se da click a next. Aparecerá esta ventana:

![image](https://github.com/roy343/Proyecto-III-Odyssey-Music-Extension/blob/main/Wiki/6.PNG)

* Se presiona next para iniciar el proceso de escritura de datos
* Si todo salió correctamente, MusicData debería tener los datos listos. Para revisar si es el caso, debe resaltarse y ejecutarse en el script la línea "Select * from MusicData"
* Si todo funcionó, ésto aparecerá como resultado:

![image](https://github.com/roy343/Proyecto-III-Odyssey-Music-Extension/blob/main/Wiki/7.PNG)

## Extencion de Chrome
* Abrir Chrome y seleccionar la parte de "Extensiones" y "Administrar extensiones"
![image](https://github.com/Daval03/Project-OdisseyRadio/blob/main/Resorces/Captura%20de%20pantalla%20de%202021-01-29%2016-34-10.png)
* Seleccionar "Cargar extension sin empaquetar" y abrir la carpeta donde este el manifiesto
![image](https://github.com/Daval03/Project-OdisseyRadio/blob/main/Resorces/Captura%20de%20pantalla%20de%202021-01-29%2016-34-19.png)
