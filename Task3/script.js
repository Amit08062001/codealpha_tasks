// Elements
const trackImage = document.getElementById('track-image');
const trackTitle = document.getElementById('track-title');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const speedSlider = document.getElementById('speed-slider');
const songListElement = document.getElementById('song-list');
const darkModeToggle = document.getElementById('dark-mode');

// Variables
let audio = new Audio();
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Songs array
const trackList = [
    { title: 'Kesariya 1', src: 'Keariya.mp3', image: 'https://www.easterneye.biz/wp-content/uploads/2024/05/kesariya-only-indian-song-to-surpass-500-million-streams-on-spotify-1024x576.jpg' },
    { title: 'Apna Bana Le', src: 'Apna-Bana-Le.mp3', image: 'https://i.ytimg.com/vi/ElZfdU54Cp8/maxresdefault.jpg' },
    { title: 'Kesariya 2', src: 'Keariya.mp3', image: 'https://www.easterneye.biz/wp-content/uploads/2024/05/kesariya-only-indian-song-to-surpass-500-million-streams-on-spotify-1024x576.jpg' }
];

// Load track
function loadTrack(index) {
    const track = trackList[index];
    audio.src = track.src;
    trackTitle.innerText = track.title;
    trackImage.src = track.image;
    audio.load();

    audio.onloadedmetadata = () => {
        progressBar.max = Math.floor(audio.duration);
        totalTimeDisplay.innerText = formatTime(audio.duration);
    };
    updateProgress();
}

// Play/Pause track
function playPauseTrack() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerText = '▶️'; // Update to play icon
    } else {
        audio.play();
        playPauseBtn.innerText = '⏸'; // Update to pause icon
    }
    isPlaying = !isPlaying; // Toggle play state
}

// Ensure playPauseTrack is bound to the button
playPauseBtn.addEventListener('click', playPauseTrack);

// Event listeners to ensure play/pause state is synced
audio.addEventListener('play', () => {
    isPlaying = true;
    playPauseBtn.innerText = '⏸'; // Ensure button reflects playing state
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.innerText = '▶️'; // Ensure button reflects paused state
});

// Previous track
prevBtn.addEventListener('click', () => {
    currentTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : trackList.length - 1;
    loadTrack(currentTrackIndex);
    playPauseTrack();
});

// Next track
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack(currentTrackIndex);
    playPauseTrack();
});

// Shuffle
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});

// Repeat
repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
});

// Update progress
function updateProgress() {
    audio.ontimeupdate = () => {
        progressBar.value = Math.floor(audio.currentTime);
        currentTimeDisplay.innerText = formatTime(audio.currentTime);
    };
}

// Seek
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Speed control
speedSlider.addEventListener('input', () => {
    audio.playbackRate = speedSlider.value;
});

// Format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

// Generate playlist dynamically
function generatePlaylist() {
    trackList.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = track.title;
        listItem.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(index);
            playPauseTrack();
        });
        songListElement.appendChild(listItem);
    });
}

// Initialize
loadTrack(currentTrackIndex);
generatePlaylist();

// Auto play next when track ends
audio.addEventListener('ended', () => {
    if (isRepeat) {
        loadTrack(currentTrackIndex);
        playPauseTrack();
    } else if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * trackList.length);
        loadTrack(currentTrackIndex);
        playPauseTrack();
    } else {
        nextTrack();
    }
});
