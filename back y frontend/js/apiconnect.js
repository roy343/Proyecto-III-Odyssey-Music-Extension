// user's variables
var userEmail;
var userId = 1;

// YouTube API's variables
var globalURL = 'http://localhost:3000';
var API_KEY = "[YOUR_API_KEY]";
var YTApi = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=";

// Song's variables
var globalSongs;
var songKey = " ";
var videoId;
var songName = " No song found ";
var artistName = " No artist found  ";
var albumName = "  No album found  ";
var coverImage = 'images/ncs1';

// App's variables
var request;
var canUseApp = false;

Start();

/**
 * Get user's email that is logged in chrome
 */
chrome.identity.getProfileUserInfo(function(userInfo) {
    userEmail = userInfo.email;
    // Auth(userEmail);     AGREGAR HASTA QUE ESTE LA TABLA
});

/**
 * Checks if the user exists on the database
 * @async
 * @param {string} pEmail 
 * @returns {Promise} Returns server response
 */
async function CheckUser(pEmail) {
    var path = `/users/exists/${pEmail}`;
    const response = await fetch(globalURL + path);
    const data = response.json();
    console.log(data);
    return data;
}

/**
 * If the user exists, allows them to use the app. If not, add them
 * @param {string} pEmail User's email
 */
async function Auth(pEmail) {
    if (userEmail != "") {
        var isThere = await CheckUser(pEmail);
        if (isThere.exist != true) {
            PostData(userEmail);
            isThere = await CheckUser(userEmail);
            userId = isThere.body[0]; // Agregar atributo id usuario
            console.log(userId);
        } else {
            userId = isThere.body[0]; // Agregar atributo id usuario
            console.log(userId);
        }
        canUseApp = true;
    } else {
        console.log("User not logged in Chrome");
    }
}

/**
 * POST function to add a new user in the data base
 * @param {string} pEmail - User's email
 */
function PostData(pEmail) {
    var path = `/users`;
    fetch(globalURL + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: pEmail })
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
        })
}

/**
 * Request the songs at the start of the application
 * @async
 */
async function Start() {
    var temp = await getAllSoundtracks();
    temp = globalSongs;
    request = temp;
}

/**
 * Gets a list of songs acording with a the given input
 * @async
 * @param {*} req User's input
 * @returns {Promise} Json with the song's info
 */
async function getSoundtracks(req) {
    var path = `/songs/${req}`;
    var response = await fetch(globalURL + path, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                //'usuario': userId
            }
        })
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        })
    globalSongs = response[0];
}

/**
 * Gets a list of all the songs in the database
 * @async
 * @returns {Promise} Json with the song's info
 */
async function getAllSoundtracks() {
    var path = '/songs';
    var response = await fetch(globalURL + path, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                // 'usuario': userId
            }
        })
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        })
    globalSongs = response[0];
}

/**
 * Makes a request to the YouTube Search List API
 * @param {string} search 
 * @returns {videoId} Song's id to be played
 */
function musicSearch(search) {
    $.get(YTApi + API_KEY + "&q=" + search, function(data) {
        var counter = 0;
        data.items.forEach(item => {
            if (counter == 0) {
                songKey = item.id.videoId;
                coverImage = item.snippet.thumbnails.high.url;
                videoId = songKey;
                counter += 1;
                return videoId;
            }
        })
    });
}

/**
 * Activates when the user hits enter
 */
chrome.omnibox.onInputEntered.addListener(function(text) {
    var search = musicSearch(text);
    for (elem of globalSongs) {
        if (elem.nombre_cancion + " " + elem.nombre_artista == text) {
            songKey = search;
            songName = elem.nombre_cancion;
            artistName = elem.nombre_artista;
            albumName = elem.nombre_album;
            break;
        }
    }
    setTimeout(function() {
        player.loadVideoById(songKey);
        player.playVideo();
        isPlaying = true;
    }, 2000);
});

/**
 * Activates everytime the user writes something in the omnibox
 * @returns A list of suggestions acording to the user input
 */
chrome.omnibox.onInputChanged.addListener(async function(text, suggest) {
    if (text != "*ALL") {
        await getSoundtracks(text);
    } else {
        await getAllSoundtracks();
    }
    if (globalSongs.length != 0) {
        for (element of globalSongs) {
            suggest([{
                content: element.nombre_cancion + " " + element.nombre_artista,
                description: element.nombre_cancion + " - " + element.nombre_album,
                deletable: true
            }]);
        }
    } else {
        suggest([{
            content: " ",
            description: "Not results for: " + text
        }]);
    }
});

/**
 * Chrome's API's function that recieve messages.
 * Gives an action to the application to do.
 * @param {object} mesgsage The message with the action
 */
chrome.runtime.onMessage.addListener(function(message) {
    console.log(message);
    if (message.intended === 'API') {
        if (message.action == "nextSong") {
            playNext();
        } else if (message.action == "prevSong") {
            playPrevious();
        }
    }
})

/**
 * Gets next song to be played
 */
function playNext() {
    if (songName != -1) {
        var i = 0;
        for (element of request) {
            if (element.nombre_cancion == songName) {
                break;
            } else {
                i++
            }
        }
        console.log(request[i + 1]);
        if (i < request.length - 1) {
            getSongData(request[i + 1]);
            player.loadVideoById(songKey);
            isPlaying = true;
        } else {
            getSongData(request[i]);
            player.loadVideoById(songKey);
            isPlaying = true;
        }
    } else {
        getSongData(request[i]);
        player.loadVideoById(songKey);
        isPlaying = true;
    }
}

/**
 * Gets previous song to be played
 */
function playPrevious() {
    if (songName != -1) {
        var i = 0;
        for (element of request) {
            if (element.nombre_cancion == songName) {
                console.log("encontre antes");
                break;
            } else {
                i++
            }
        }
        console.log(request[i - 1]);
        if (i < request.length - 1) {
            getSongData(request[i - 1]);
            console.log(songKey);
            player.loadVideoById(songKey);
            isPlaying = true;
        } else {
            getSongData(request[i]);
            player.loadVideoById(songKey);
            isPlaying = true;
        }
    } else {
        getSongData(request[i]);
        console.log(songKey);
        player.loadVideoById(songKey);
        isPlaying = true;
    }
}

/**
 * Gets song's data according to the database
 * @param {Object} song Song's information in JSON format
 */
function getSongData(song) {
    musicSearch(song.nombre_cancion + " " + song.nombre_artista);
    setTimeout(function() {
        songName = song.nombre_cancion;
        artistName = song.nombre_artista;
        albumName = song.nombre_album;
    }, 2000)
}