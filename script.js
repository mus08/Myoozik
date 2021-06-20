let fav = document.querySelector(".fav");
let repeat = document.querySelector(".repeat");
let prev = document.querySelector(".prev");
let playPauseBtn = document.querySelector(".play");
let next = document.querySelector(".next");
let vol = document.querySelector(".vol");
let startTime = document.querySelector(".current-timer");
let endTime = document.querySelector(".max-duration");
let audio = document.querySelector(".progress-area audio");
let nowPlaying = document.querySelector(".now-playing");
let progress = document.querySelector(".progress");
let progressContainer = document.querySelector(".progress-container");
let picture = document.getElementById('image');
let name = document.querySelector(".name");
let artist = document.querySelector(".artist");
let moreMusic = document.querySelector(".moreMusic");
let musicContainer = document.querySelector(".musicContainer");
let audioList = document.querySelector(".audio-list");
let playlistTab = document.querySelector(".playlist-tab");





//song aray
const songs = ['Pani Di Gal', 'Khabbi Seat', 'On My Way', 'Clash', 'Friends', 'Gal Karke', 'Blank Space', 'Naah'];
const singer = ['Maninder Buttar', 'Ammy Virk', 'Alan Walker', 'Diljit Dosanjh', 'Marshmello , Anne-Marie', 'Asees Kaur', 'Taylor Swift', 'Hardy Sandhu'];
const favourites = ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false'];



let songIndex = 0;


loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
    name.innerText = song;
    audio.src = `music/${song}.mp3`;
    picture.src = `images/${song}.jpg`;

}


function singersName(names) {
    artist.innerText = names;
}


//previous function
function previousSong() {

    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }


    loadSong(songs[songIndex]);
    singersName(singer[songIndex]);
    playPauseBtn.textContent = "pause"
    loadLikes(songIndex);
    audio.play();

}



//change previous songggg
prev.addEventListener("click", previousSong);


//next function
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playPauseBtn.textContent = "pause";
    singersName(singer[songIndex]);
    loadLikes(songIndex);
    audio.play();

}



//change next songggg
next.addEventListener("click", nextSong);


//to change inner html of play pause button

playPauseBtn.addEventListener("click", function() {

    if (playPauseBtn.innerHTML == "play_arrow") {
        playPauseBtn.innerHTML = "pause"
        audio.play();
    } else {
        playPauseBtn.innerHTML = "play_arrow"
        audio.pause();

    }
})


// Update progress bar
audio.addEventListener('timeupdate', function(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100

    progress.style.width = `${progressPercent}%`

    let totalTimeMin = Math.floor(duration / 60);
    let totalTimeSec = Math.floor(duration % 60);

    if (totalTimeSec < 10) {
        totalTimeSec = "0" + totalTimeSec;
    }
    let totalTimeDuration = totalTimeMin + ":" + totalTimeSec;
    if (duration) {
        endTime.textContent = totalTimeDuration;
    }

    let currentTimeMin = Math.floor(currentTime / 60);
    let currentTimeSec = Math.floor(currentTime % 60);

    if (currentTimeSec < 10) {
        currentTimeSec = "0" + currentTimeSec;
    }
    let currentTimeDuration = currentTimeMin + ":" + currentTimeSec;
    startTime.textContent = currentTimeDuration;
});




progressContainer.addEventListener("click", function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
})

//volume

let volumeBarClicked = true;

function openVolumeBar() {
    volumeBarClicked = false;
    let volumeBar = document.createElement("input");
    volumeBar.classList.add("range-sound");
    volumeBar.setAttribute("type", "range");

    volumeBar.setAttribute("min", "0");
    volumeBar.setAttribute("max", "100");
    volumeBar.setAttribute("value", "100");
    musicContainer.append(volumeBar);

}

function closeVolumeBar() {
    volumeBarClicked = true;
    let volumeBar = document.querySelector("input");
    volumeBar.remove();

}
document.querySelector(".vol").addEventListener("click", function(e) {
    volumeBarClicked ? openVolumeBar() : closeVolumeBar();
    if (!volumeBarClicked) {
        document.querySelector(".range-sound").addEventListener("change", function(e) {

            audio.volume = e.currentTarget.value / 100;

        })
    }
})




//favourite 
fav.addEventListener("click", function() {
    if (favourites[songIndex] == 'true') {
        favourites[songIndex] = 'false';
    } else {
        favourites[songIndex] = 'true';
    }
    loadLikes(songIndex);
})


function loadLikes(index) {
    if (favourites[index] == 'true') {

        fav.style.color = "red";
    } else {

        fav.style.color = "white";

    }
}




////show music list onclick of music icon

for (let i = 0; i < songs.length; i++) {
    const div = document.createElement("div"); //create div

    div.classList.add(`pSong-${i}`); //adding class
    div.classList.add("pSong")
    div.innerText = songs[i] + "------" + singer[i]; //songs names
    //   div.innerText=singer[i];
    audioList.appendChild(div);
}


for (let i = 0; i < songs.length; i++) {
    document.querySelector(`.pSong-${i}`).addEventListener("click", function(e) {

        let idx = parseInt(e.currentTarget.classList[0].split("-")[1]); //array 
        loadSong(songs[idx]);
        // playPause();
        audio.play();
        playPauseBtn.textContent = "pause";
        singersName(singer[idx]);

    })
}


playlistTab.style.opacity = "0";
moreMusic.addEventListener("click", function() {

    if (moreMusic.innerHTML == "queue_music") {
        moreMusic.innerHTML = "reorder";
        playlistTab.style.opacity = "1";


    } else {
        moreMusic.innerHTML = "queue_music";
        playlistTab.style.opacity = "0";


    }
})




//shuffle
repeat.addEventListener("click", function() {
    let getText = repeat.innerText;
    switch (getText) {
        case "repeat":
            repeat.innerHTML = "shuffle";
            repeat.setAttribute("title", "shuffled play");
            break;

        case "shuffle":
            repeat.innerHTML = "repeat";
            repeat.setAttribute("title", "playlist is looped");
            break;

    }
});

repeat.addEventListener("ended", function() {
    let getText = repeat.innerText;
    switch (getText) {
        case "repeat":
            nextSong();


        case "shuffle":
            let randomIndex = getRandomNumber(0, songs.length - 1);
            songIndex = randomIndex;
            loadSong(songIndex);
            audio.play();


    }
});

function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}