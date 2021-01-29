// Background variables
console.log("Background has been initiated");
var testThread;
let message;
let isPlaying = false;

// Creates the music player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var songId = 'RtuaLaMFZSI';

/**
 * Sends a message using chrome's API
 * @param {Object} message 
 */
function SendMessage(message) {
    chrome.runtime.sendMessage(message);
}

/**
 * Creates a YouTube embeded visualizer
 */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: songId,
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

/**
 * Checks if the videoplayer is ready to be used
 * @param {Object} event 
 */
function onPlayerReady(event) {
    console.log("player listo");
}

/**
 * Sends video's progress updates 
 */
function OnPlay() {
    message = {
        intended: "popup",
        action: "progressBar",
        CurrentTime: player.getCurrentTime(),
        Duration: player.getDuration()
    };
    SendMessage(message);
}

/**
 * Listener of the YouTube player when it changes from any state to another
 * @param {Object} event Event sended it from the app
 */
function onPlayerStateChange(event) {
    if (event.data == 1) {
        testThread = setInterval(OnPlay, 500);
        SendStatus();
    } else if (event.data == 0) {
        playNext();
    } else {
        clearInterval(testThread);
    }
}

/**
 * Chrome's API function
 * According to the action, makes media changes or sends information to the App
 * @param {Object} message Message that indicates the action to be made
 */
chrome.runtime.onMessage.addListener(function(message) {
    console.log(message);
    if (message.intended === 'player') {
        if (message.txt == "Hello from the other side") {
            SendStatus();
        } else if (message.action == "videoPlay") {
            player.playVideo();
            isPlaying = true;
        } else if (message.action == "videoPause") {
            player.pauseVideo();
            isPlaying = false;
        } else if (message.action == "volume") {
            player.setVolume(message.value);
        } else if (message.action == "progress") {
            player.seekTo(message.value);
        } else if (message.action == "AudioMute") {
            player.mute();
        } else if (message.action == "AudioUnmute") {
            player.unMute();
        }
    }
})

/**
 * Sends the information need it to be visualized in the App
 */
function SendStatus() {
    message = {
        intended: "popup",
        action: "status",
        artista: artistName,
        cancion: songName,
        album: albumName,
        cover: coverImage,
        estado: isPlaying,
        volumen: player.getVolume(),
        videoLenght: player.getDuration(),
        videoProgress: player.getCurrentTime(),
        muteado: player.isMuted()
    };
    SendMessage(message);
}