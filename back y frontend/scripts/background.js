var suggestions = [];

/**
 * Gives a suggestions list to the user
 * @param {*} data Songs received from the server
 * @param {number} CANT_SUGGESTS  Number of songs to be shown
 */
function suggestionList(text, data, CANT_SUGGESTS) {
    var list = [];
    for (i = 0; i < CANT_SUGGESTS; i++) {
        var object = {
            content: text,
            description: suggestionListAux(data[i])
        };
        list.push(object);
    }
    suggestions = list;
    return list;
}

/**
 * Creates text to be shown in the omnibox's suggestions
 * @param {object} data 
 */
function suggestionListAux(data) {
    let SongName = "Song: " + data.nombre_cancion;
    let ArtistName = "     /     Artist: " + data.nombre_artista;
    return SongName + ArtistName;
}

const SUGGESTIONS_CUANTITY = 5; // Ammount of suggestions
const ALL_SUGGEST = 9; // Max suggestions
const TIME_FOR_EACH_REQUEST = 1000; // Wait time for each request

var songList = []; // List of songs
var currentSongIndex = 0; // Index for the songs
var allKeywords = false; // If the input has all the keywords
var lastRequest = new Date().getTime() - TIME_FOR_EACH_REQUEST;
var requestTime; // Time that took the request


/**
 * Default suggestion
 */
chrome.omnibox.setDefaultSuggestion({
    description: "Search songs by name, artist or lyric"
});

/**
 * An omnibox listener, used everytime the user inserts a character
 */
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {
        var apiCall = 'http://localhost:3000/songs/' + text;
        requestTime = new Date().getTime();
        if (text == "*ALL") {
            apiCall = 'http://localhost:3000/songs';
            console.log("Getting all songs...");
        }
        if (requestTime - lastRequest >= TIME_FOR_EACH_REQUEST) {
            lastRequest = requestTime;
            fetch(apiCall).then(function(res) {
                // Check if the server is down
                if (res.status != 200) {
                    suggest([
                        { content: "None", description: "Server is down" }
                    ])
                }
                // Adds the suggestion
                res.json().then(function(data) {
                    if (text == "*ALL") {
                        list = suggestionList(text, data[0], ALL_SUGGEST);
                    } else {
                        list = suggestionList(text, data[0], SUGGESTIONS_CUANTITY);
                        console.log(list);
                    }
                    suggest(list);
                }).catch(function(err) {
                    suggest([{ content: 'Error', description: 'Problem loading server information...' }]);
                })
            });
        }
        console.log(text);
    }
);

/**
 * An omnibox listener, uses the Spotify's player media
 */
chrome.omnibox.onInputEntered.addListener(
    function(text) {
        console.log(text);
        songList.push('https://open.spotify.com/embed/track/' + text);
    }
);

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (songList.length == 0) {
        console.log("Empty list");
        response(["Empty List", currentSongIndex + 1, songList.length]);
    } else {
        if (msg.name == "Next Song" & currentSongIndex + 1 < songList.length) {
            currentSongIndex += 1;
            response([songList[currentSongIndex], currentSongIndex + 1, songList.length]);
        } else if (msg.name == "Previous Song" & currentSongIndex !== 0) {
            currentSongIndex -= 1;
            response([songList[currentSongIndex], currentSongIndex + 1, songList.length]);
        } else if (msg.name == "Current Song") {
            response([songList[currentSongIndex], currentSongIndex + 1, songList.length]);
        } else {
            response(["No Movement", currentSongIndex + 1, songList.length]);
        }
    }
});