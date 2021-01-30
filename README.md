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

* Finalmente, para dejar la base de datos lista para usarse, se resalta todo el codigo relacionado a "Create procedures" y se ejecuta. Esto permitirá al API utilizar estos procedures

## Servidor

* Para poder ejecutar el servidor es necesario descargar e instalar node.js y se recomienda usar Visual Studio Code.
* Una vez que tenga todo instalado es necesario abrir la carpeta del proyecto usando Visual Studio Code, esto se puede hacer seleccionando la carpeta del proyecto con click derecho y seleccionar "Abrir con Code".

* Una vez que se habra VS code es necesario abrir una terminal que este ubicada en la carpeta "rest-api", para facilitar esto haga click derecho sobre la carpeta y seleccione "Open in Integrated Terminal"

* Se le abrira una terminal ya ubicada en la carpeta donde se encuentra el codigo a ejecutar. Ahora es necesario instalar los modulos necesarios para correr el servidor. En al terminal que acaba de abrir corra el comando "npm i express mysql cors nodemon".

![image](https://user-images.githubusercontent.com/28927252/106340681-3c1f5180-6260-11eb-81b5-c32f35ebb21e.png)

* Una vez que se terminen de instalar todos los modulos ya se puede ejecutar el servidor, para esto es necesario correr el modulo "npm run dev".

![image](https://user-images.githubusercontent.com/28927252/106340932-0890f700-6261-11eb-839b-fc12822dedf3.png)

* Una vez que se ejecute el servidor le debera de aparecer un mensaje confirmando que el servidor esta corriendo.

![image](https://user-images.githubusercontent.com/28927252/106340999-3f670d00-6261-11eb-8686-56f5ed87657d.png)

## Background
Cambiar la línea de código numero 7 en el archivo `apiconnect.js`, la sección `[YOUR API KEY]`, inserte su llave de Google Cloud de API con la autorización para utilizar la API de YouTube para poder buscar las canciones.

## Extencion de Chrome
* Abrir Chrome y seleccionar la parte de "Extensiones" y "Administrar extensiones"
![image](https://github.com/Daval03/Project-OdisseyRadio/blob/main/Resorces/Captura%20de%20pantalla%20de%202021-01-29%2016-34-10.png)
* Seleccionar "Cargar extension sin empaquetar" y abrir la carpeta donde este el manifiesto
![image](https://github.com/Daval03/Project-OdisseyRadio/blob/main/Resorces/Captura%20de%20pantalla%20de%202021-01-29%2016-34-19.png)
