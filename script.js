// =========================
// Spotify Player
// Part 3A
// =========================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progressBar = document.getElementById("progress-bar");
const progress = document.querySelector(".progress");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const cover = document.getElementById("cover");

const lyric = document.getElementById("lyric");

const player = document.querySelector(".player");

// =========================
// PLAY / PAUSE
// =========================

playBtn.addEventListener("click", () => {

    if(audio.paused){

        audio.play();

    }else{

        audio.pause();

    }

});

audio.addEventListener("play", () => {

    playBtn.innerHTML = "⏸";

    cover.classList.add("rotate");

    player.classList.add("playing");

});

audio.addEventListener("pause", () => {

    playBtn.innerHTML = "▶";

    cover.classList.remove("rotate");

    player.classList.remove("playing");

});

// =========================
// VOLUME
// =========================

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

});

// =========================
// UPDATE PROGRESS
// =========================

audio.addEventListener("timeupdate", () => {

    const percent =
        (audio.currentTime / audio.duration) * 100;

    progressBar.style.width = percent + "%";

    current.innerHTML = formatTime(audio.currentTime);

});

// =========================
// TOTAL DURATION
// =========================

audio.addEventListener("loadedmetadata", () => {

    duration.innerHTML =
        formatTime(audio.duration);

});

// =========================
// FORMAT WAKTU
// =========================

function formatTime(time){

    if(isNaN(time)) return "0:00";

    const minute = Math.floor(time / 60);

    const second = Math.floor(time % 60);

    return minute + ":" +

    (second < 10 ? "0" + second : second);

}
// =========================
// Part 3B
// Progress Click
// Next / Previous
// Playlist
// =========================

// Klik progress bar

progress.addEventListener("click",(e)=>{

const width=progress.clientWidth;

const clickX=e.offsetX;

const duration=audio.duration;

audio.currentTime=(clickX/width)*duration;

});

// Lagu selesai

audio.addEventListener("ended",()=>{

playBtn.innerHTML="▶";

cover.classList.remove("rotate");

player.classList.remove("playing");

progressBar.style.width="0%";

});

// Playlist

const playlist=document.querySelectorAll(".playlist li");

playlist.forEach((item)=>{

item.addEventListener("click",()=>{

playlist.forEach(i=>i.classList.remove("active"));

item.classList.add("active");

});

});

// Tombol Next

nextBtn.addEventListener("click",()=>{

let currentIndex=0;

playlist.forEach((item,index)=>{

if(item.classList.contains("active")){

currentIndex=index;

}

});

playlist[currentIndex].classList.remove("active");

currentIndex++;

if(currentIndex>=playlist.length){

currentIndex=0;

}

playlist[currentIndex].classList.add("active");

});

// Tombol Previous

prevBtn.addEventListener("click",()=>{

let currentIndex=0;

playlist.forEach((item,index)=>{

if(item.classList.contains("active")){

currentIndex=index;

}

});

playlist[currentIndex].classList.remove("active");

currentIndex--;

if(currentIndex<0){

currentIndex=playlist.length-1;

}

playlist[currentIndex].classList.add("active");

});
// =========================
// Part 3C
// Lyrics System
// =========================

// =========================
// ISI LIRIK DI SINI
// =========================

const lyrics = [

    { time: 0, text: "I don't know where to start" },

    { time: 5, text: "But to show you the shape of my heart" },

    { time: 16, text: "I'm lookin' back on things I've done" },

    { time: 21, text: "I never wanna play the same old part" },
    { time: 27, text: "I'll keep you in the dark"},
    { time: 31, text: "Now let me show you the shape of my heart" },
    { time: 36, text: "Looking back on the things I've done" },

    { time: 39, text: "I was trying to be someone" },
];

// =========================
// AUTO CHANGE LYRIC
// =========================

audio.addEventListener("timeupdate",()=>{

    let currentTime = audio.currentTime;

    for(let i = lyrics.length-1; i>=0; i--){

        if(currentTime >= lyrics[i].time){

            lyric.classList.add("fade");

            setTimeout(()=>{

                lyric.innerHTML = lyrics[i].text;

                lyric.classList.remove("fade");

            },150);

            break;

        }

    }

});