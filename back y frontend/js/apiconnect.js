var globalURL = 'http://localhost:3000';
var userEmail;
var userId = 1;
var API_KEY = "AIzaSyBavevmSDeINyu57PksXgM1z6g4T4LW58E";
var YTApi = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=";
var globalSongs;
var request;

Start();

chrome.identity.getProfileUserInfo(function(userInfo) {
    userEmail = userInfo.email;
});

async function Start() {
    var temp = await getAllSoundtracks();
}

async function getSoundtracks(req) {
    var path = `/songs/${req}`;
    var response = await fetch(globalURL + path, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'usuario': userId
            }
        })
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        })
    return response[0];
}

async function getAllSoundtracks() {
    var path = '/songs';
    var response = await fetch(globalURL + path, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'usuario': userId
            }
        })
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        })
    return response[0];
}

function musicSearch(search) {
    var songId;
    $.get(YTApi + API_KEY + "&q=" + search, function(data) {
        data.items.forEach(item => {
            songId = item.id.videoId;
        })
    });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
    var search = musicSearch(text);
    search = "l482T0yNkeo";
});

chrome.omnibox.onInputChanged.addListener(async function(text, suggest) {
    if (text != "*ALL") {
        globalSongs = await getSoundtracks(text);
    } else {
        globalSongs = await getAllSoundtracks();
    }
    console.log(globalSongs);
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

function getSongData(song) {

}