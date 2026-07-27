// =============================
// ELEMENT
// =============================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const progressBox = document.querySelector(".progress");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const cover = document.getElementById("cover");

const lyricsContainer = document.getElementById("lyrics-container");

// =============================
// PLAY / PAUSE
// =============================

playBtn.onclick = () => {

    if(audio.paused){

        audio.play();

    }else{

        audio.pause();

    }

}

audio.onplay = () => {

    playBtn.innerHTML = "⏸";

    cover.classList.add("rotate");

}

audio.onpause = () => {

    playBtn.innerHTML = "▶";

    cover.classList.remove("rotate");

}

// =============================
// VOLUME
// =============================

volume.oninput = () => {

    audio.volume = volume.value / 100;

}

// =============================
// FORMAT TIME
// =============================

function formatTime(time){

    if(isNaN(time)) return "0:00";

    const m = Math.floor(time / 60);

    const s = Math.floor(time % 60);

    return `${m}:${s < 10 ? "0"+s : s}`;

}

// =============================
// DURATION
// =============================

audio.onloadedmetadata = () => {

    duration.innerHTML = formatTime(audio.duration);

}

// =============================
// UPDATE PROGRESS
// =============================

audio.ontimeupdate = () => {

    current.innerHTML = formatTime(audio.currentTime);

    const percent =
    (audio.currentTime / audio.duration) * 100;

    progress.style.width = percent + "%";

}

// =============================
// CLICK PROGRESS BAR
// =============================

progressBox.onclick = (e)=>{

    const width = progressBox.clientWidth;

    const click = e.offsetX;

    audio.currentTime =
    (click / width) * audio.duration;

}
// =====================================
// LYRICS
// =====================================

const lyrics = [

    { time:0, text:"I don't know where to start" },
    { time:5, text:"But to show you the shape of my heart" },
    { time:16, text:"I'm lookin' back on things I've done" },
    { time:21, text:"I never wanna play the same old part" },
    { time:27, text:"I'll keep you in the dark" },
    { time:30, text:"Now let me show you the shape of my heart" },
    { time:36, text:"Looking back on the things I've done" },
    { time:39, text:"I was trying to be someone" },
    { time:43, text:"trying to be someone" },
    { time:47, text:"Kept you in the dark" },
    { time:50, text:"Now let me show you the shape of my heart" },
    { time:56, text:"Looking back on the things I've done" },

];

// Membuat elemen lirik

lyrics.forEach(line=>{

    const p=document.createElement("p");

    p.textContent=line.text;

    lyricsContainer.appendChild(p);

});

const lyricLines=document.querySelectorAll("#lyrics-container p");

// Update lirik

audio.addEventListener("timeupdate",()=>{

    let activeIndex=0;

    for(let i=lyrics.length-1;i>=0;i--){

        if(audio.currentTime>=lyrics[i].time){

            activeIndex=i;
            break;

        }

    }

    lyricLines.forEach(line=>{

        line.classList.remove("active");

    });

    if(lyricLines[activeIndex]){

        lyricLines[activeIndex].classList.add("active");

        lyricLines[activeIndex].scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

});