console.log("Background has been initiated");
var testThread;
let message;
let isPlaying = false;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var songId = 'RtuaLaMFZSI';

function SendMessage(message) {
    chrome.runtime.sendMessage(message);
}

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

function onPlayerReady(event) {
    console.log("player listo");
}

function OnPlay() {
    message = {
        intended: "popup",
        action: "progressBar",
        CurrentTime: player.getCurrentTime(),
        Duration: player.getDuration()
    };
    SendMessage(message);
}

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