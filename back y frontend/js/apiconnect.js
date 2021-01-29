// users' variables
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

chrome.identity.getProfileUserInfo(function(userInfo) {
    userEmail = userInfo.email;
    // Auth(userEmail);     AGREGAR HASTA QUE ESTE LA TABLA
});

async function CheckUser(pEmail) {
    var path = `/users/exists/${pEmail}`;
    const response = await fetch(globalURL + path);
    const data = response.json();
    console.log(data);
    return data;
}

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

async function Start() {
    var temp = await getAllSoundtracks();
    temp = globalSongs;
    request = temp;
}

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

function musicSearch(search) {
    $.get(YTApi + API_KEY + "&q=" + search, function(data) {
        var counter = 0;
        console.log(data.items[0].id.videoId);
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

chrome.omnibox.onInputEntered.addListener(function(text) {
    var search = musicSearch(text);
    console.log(search);
    console.log(songKey);
    for (elem of globalSongs) {
        if (elem.nombre_cancion == text) {
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
        if (i < request.length - 1) {
            getSongData(request[i + 1]);
            player.loadVideoById(request[i + 1].songKey);
            isPlaying = true;
        } else {
            getSongData(request[i]);
            player.loadVideoById(request[i].songKey);
            isPlaying = true;
        }
    } else {
        getSongData(request[i]);
        player.loadVideoById(request[i].songKey);
        isPlaying = true;
    }
}

function playPrevious() {
    if (songName != -1) {
        var i = 0;
        for (element of request) {
            if (element.nombre_cancion == songName) {
                break;
            } else {
                i++
            }
        }
        console.log(i);
        if (i < request.length - 1) {
            getSongData(request[i - 1]);
            player.loadVideoById(request[i - 1].songKey);
            isPlaying = true;
        } else {
            getSongData(request[i]);
            player.loadVideoById(request[i].songKey);
            isPlaying = true;
        }
    } else {
        getSongData(request[i]);
        player.loadVideoById(request[i].songKey);
        isPlaying = true;
    }
}

function getSongData(song) {
    songKey = musicSearch(song.nombre_cancion + " " + song.nombre_artista);
    songName = song.nombre_cancion;
    artistName = song.nombre_artista;
    albumName = song.nombre_album;
}