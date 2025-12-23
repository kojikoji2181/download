const tracks = [
    {
        id: 1,
        title: "CNPくるりんぱ（ショート）",
        artist: "CNP",
        cover: "",
        source: "assets/music/track1.MP3",
        duration: "--:--"
    },
    {
        id: 2,
        title: "CNPくるりんぱ（フル）",
        artist: "CNP",
        cover: "",
        source: "assets/music/track2.mp3",
        duration: "--:--"
    }
];

const audioPlayer = document.getElementById('mainAudioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackList = document.getElementById('trackList');
const downloadBtn = document.getElementById('downloadBtn');

const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const currentCover = document.getElementById('currentCover');

let currentTrackIndex = 0;
let isPlaying = false;

// Initialize
function init() {
    renderTrackList();
    loadTrack(currentTrackIndex);

    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrev);
    nextBtn.addEventListener('click', playNext);

    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
        progressBar.max = audioPlayer.duration;
    });
    audioPlayer.addEventListener('ended', playNext);

    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });
}

// Render Track List
function renderTrackList() {
    trackList.innerHTML = '';
    tracks.forEach((track, index) => {
        const div = document.createElement('div');
        div.className = 'track-card';
        div.innerHTML = `
            <div class="card-image" style="background-image: url('${track.cover}');">
                ${!track.cover.includes('.') ? '<i class="fa-solid fa-music"></i>' : ''}
                <div class="overlay">
                    <div class="play-icon-overlay">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
            </div>
            <div class="card-info">
                <h3>${track.title}</h3>
                <p>${track.artist}</p>
            </div>
            <div class="card-actions">
                <span style="font-size: 0.8rem; color: #666;">${track.duration}</span>
                <a href="${track.source}" download class="download-link-mini" title="Download">
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
        `;

        div.addEventListener('click', (e) => {
            // If clicked on download, don't play
            if (e.target.closest('.download-link-mini')) return;

            playTrack(index);
        });

        trackList.appendChild(div);
    });
}

// Player Functions
function loadTrack(index) {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];

    audioPlayer.src = track.source;

    // Update UI
    currentTitle.textContent = track.title;
    currentArtist.textContent = track.artist;

    if (track.cover && track.cover.includes('.')) {
        currentCover.style.backgroundImage = `url('${track.cover}')`;
        currentCover.innerHTML = '';
    } else {
        currentCover.style.backgroundImage = 'none';
        currentCover.innerHTML = '<i class="fa-solid fa-music"></i>';
    }

    // Update Download Button
    downloadBtn.href = track.source;
    downloadBtn.style.pointerEvents = 'auto';
    downloadBtn.style.opacity = '1';

    // Reset Progress
    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
}

function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack(currentTrackIndex, false); // false = don't reload if same
    }
}

function playTrack(index, reload = true) {
    if (reload && index !== currentTrackIndex) {
        loadTrack(index);
    } else if (reload && index === currentTrackIndex && !isPlaying) {
        // Just resume
    }

    // If we call playTrack directly (from list), we want to play
    if (index !== currentTrackIndex) {
        loadTrack(index);
    }

    const playPromise = audioPlayer.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isPlaying = true;
            updatePlayButton();
        })
            .catch(error => {
                console.log(" playback prevented. Audio not found?");
                // Even if it fails (missing file), we update UI to show intent
                isPlaying = true;
                updatePlayButton();
                // Optional: alert user
                // alert("Audio file not found. Please add 'track1.mp3' to assets/music/");
            });
    }
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButton();
}

function playPrev() {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    playTrack(newIndex);
}

function playNext() {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= tracks.length) newIndex = 0;
    playTrack(newIndex);
}

function updatePlayButton() {
    if (isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
}

function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    if (isNaN(duration)) return;

    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = currentTime; // managed by max attribute

    currentTimeEl.textContent = formatTime(currentTime);
}

function formatTime(s) {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Start
init();
