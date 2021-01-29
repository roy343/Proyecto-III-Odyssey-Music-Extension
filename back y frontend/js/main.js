// Medialplaver variables
let playbtn, mutebtn, seekslider, volumeslider, seeking = false,
    seekto, curtimetext, durtimetext, repeat, randomSong;

var CurrentTime, Duration, playlist_status, playlist_album, artist, songName, album, cover, poster, player;

// Object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumenslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_album = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
poster = document.getElementById("image");
bgImage = document.getElementById("bgImage");

/**
 * Message object
 */
let message = {
    intended: 'player',
    txt: 'Hello from the other side'
}

/**
 * Sends a JSON message
 * @param {Object} message Action to be made
 */
function SendMessage(message) {
    chrome.runtime.sendMessage(message);
}

/**
 * Chrome API's function
 * Updates App's information
 */
chrome.runtime.onMessage.addListener(gotMessage);

/**
 * Function that allows the app to make different actions according to the action
 * @param {Object} message 
 */
function gotMessage(message) {
    console.log(message);
    if (message.intended == "popup") {
        if (message.action == "status") {
            artist = message.artista;
            songName = message.cancion;
            cover = message.cover;
            player = message.player;
            album = message.album;
            fetchMusicDetails();
            volumeslider.setAttribute("value", message.volumen);
            Duration = message.videoLenght;
            CurrentTime = message.videoProgress;
            seekTimeUpdate();
            if (message.muteado == true) {
                mutebtn.setAttribute("value", "muted");
            } else {
                mutebtn.setAttribute("value", "unmuted")
            }
            if (message.estado == true) {
                playbtn.setAttribute("value", "pause");
                $("playpausebtn img").attr("src", "images/pause-red.png")
            } else {
                playbtn.setAttribute("value", "play");
                $("playpausebtn img").attr("src", "images/play-red.png")
            }
        } else if (message.action == "progressBar") {
            CurrentTime = message.CurrentTime;
            Duration = message.Duration;
            seekTimeUpdate();
        }
    }
}

SendMessage(message);

/**
 * Updates the song information
 */
function fetchMusicDetails() {
    playlist_status.innerHTML = artist + " - " + songName;
    playlist_album.innerHTML = album;
    poster.setAttribute("src", cover);
    bgImage.setAttribute("src", cover);
}

// Event handelers
playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", function(event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener("mousemove", function(event) { seek(event); });
seekslider.addEventListener("mouseup", function() { seeking = false; });
volumeslider.addEventListener("mousemove", setVolume);

/**
 * Tells the app to stop or resume the music
 * @param {event} element Action to be made
 */
function playPause(element) {
    if (playbtn.value == "play") {
        playbtn.setAttribute("value", "pause");
        message = {
            intended: 'player',
            action: "videoPlay"
        }
        SendMessage(message);
        $("#playpausebtn img").attr("src", "images/pause-red.png");
    } else {
        playbtn.setAttribute("value", "play");
        message = {
            intended: 'player',
            action: 'videoPause'
        }
        SendMessage(message);
        $("#playpausebtn img").attr("src", "images/play-red.png");
    }
}

/**
 * Asks for the next song
 */
function nextSong() {
    message = {
        intended: "API",
        action: "nextSong"
    }
    SendMessage(message);
    fetchMusicDetails();
}

/**
 * Asks for the previous song
 */
function prevSong() {
    message = {
        intended: "API",
        action: "prevSong"
    }
    SendMessage(message);
    fetchMusicDetails();
}

/**
 * Function that mutes the Audio
 * Also, changes the icon
 */
function mute() {
    if (mutebtn.value == "muted") {
        mutebtn.setAttribute("value", "unmuted");
        message = {
            intended: 'player',
            action: 'AudioUnmute'
        }
        SendMessage(message);
        $("#mutebtn img").attr("src", "images/speaker.png");
    } else {
        mutebtn.setAttribute("value", "muted");
        message = {
            intended: 'player',
            action: 'AudioMute'
        }
        SendMessage(message);
        $("#mutebtn img").attr("src", "images/mute.png");
    }
}

/**
 * Ask the player to advance to a certain point
 * @param {event} event Position of the slider
 */
function seek(event) {
    if (Duration == 0) {
        null;
    } else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = Duration * (seekslider.value / 100);
            message = {
                intended: 'player',
                action: 'progress',
                value: seekto
            }
            SendMessage(message);
        }
    }
}

/**
 * Ask the player to change the volume
 */
function setVolume() {
    message = {
        intended: 'player',
        action: 'volume',
        value: volumeslider.value
    }
    SendMessage(message);
}

/**
 * Updates the current and the duration time of the song
 */
function seekTimeUpdate() {
    if (Duration) {
        let nt = CurrentTime * (100 / Duration);
        seekslider.value = nt;
        var curmins = Math.floor(CurrentTime / 60);
        var cursecs = Math.floor(CurrentTime - curmins * 60);
        var durmins = Math.floor(Duration / 60);
        var dursecs = Math.floor(Duration - durmins * 60);
        if (cursecs < 10) {
            cursecs = "0" + cursecs;
        }
        if (dursecs < 10) {
            dursecs = "0" + dursecs;
        }
        if (curmins < 10) {
            curmins = "0" + curmins;
        }
        if (durmins < 10) {
            durmins = "0" + durmins;
        }
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
    } else {
        curtimetext.innerHTML = "00" + ":" + "00";
        durtimetext.innerHTML = "00" + ":" + "00";
    }
}