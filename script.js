const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music  = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        imgName: 'grupodecordas',
        musicName: 'encadeia', // File name in paste
        displayName: 'Encadeia',
        artist: 'Grupo de Cordas SF/AAC',
    },
    {
        imgName: 'taleguinho',
        musicName: 'roupa-do-marinheiro',
        displayName: 'Roupa do Marinheiro',
        artist: 'Taleguinho',
    },
    {
        imgName: 'origemtradicional',
        musicName: 'se-o-loureiro',
        displayName: 'Se o Loureiro',
        artist: 'Grupo de Cordas SF/AAC',
    },
    {
        imgName: 'carriços',
        musicName: 'passo-dobrado',
        displayName: 'Passo Dobrado',
        artist: 'Grupo de Gaiteiros - Os Carriços',
    }
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => {
    !isPlaying ? playSong() : pauseSong();
});

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.musicName}.mp3`;
    image.src = `img/${song.imgName}.jpg`;
}

// Current Song
let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1; // Loop and cames to last song
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0; // Loop and cames to first song
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// On Load  - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const{duration, currentTime} = e.srcElement;
        // console.log(duration, currentTime);
        // Update progress bar width;
        const progressPercent = (currentTime/ duration) * 100 ;
        // console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        // console.log ('minutes: ', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log('Seconds: ', durationSeconds);
        // Delay switching durantion Element to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentTimeMinutes = Math.floor(currentTime / 60);
        // console.log ('minutes: ', currentTimeMinutes);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        // console.log('Seconds: ', currentTimeSeconds);
        // Delay switching durantion Element to avoid Nan
        if (currentTimeSeconds) {
            currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }
    }
}

// Set Progress Bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    // console.log('width', width);
    const clickX = e.offsetX;
    console.log('clickX', clickX);
    const {duration} = music;
    // console.log((clickX/ width) * duration);
    music.currentTime = (clickX/ width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);