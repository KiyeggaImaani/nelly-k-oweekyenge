let songs = [
    { src: 'New folder/Alobesa By Nelly K [Royal Buoy Beats].mp3', title: 'Alobesa' },
    { src: 'songs/Byewunyisa By Nelly K [Mastered By Royal Buoy Beats].mp3', title: 'Byewunyisa' },
    { src: 'New folder/DJNYCE FT NELLY K -BEND DOWN.mp3', title: 'Bend Down (feat. DJNYCE)' },
    { src: 'songs/Emboozi Za banafu By Nelly K.mp3', title: 'Emboozi Za Banafu' },
    { src: 'New folder/Muwumbo By Nelly K [Mastered By Royal Buoy Beats].mp3', title: 'Muwumbo' },
    { src: 'songs/Ntumileko By Nelly K [Royal Buoy Beats].mp3', title: 'Ntumileko' },
    { src: 'New folder/Sawa Meka By Nelly K [Royal Buoy Beats].mp3', title: 'Sawa Meka' },
    { src: 'New folder/Vokoz Oli Wanyo By Nelly K [Royal Buoy Beats].mp3', title: 'Vokoz Oli Wanyo' },
    { src: 'New folder/Wanchikicha by Nelly K Owekyenge (2).mp3', title: 'Wanchikicha' }
];
let currentSongIndex = 0;
const audio = new Audio();

// Load songs
function loadSongs() {
    populateSongList();
    loadSong(currentSongIndex);
}

const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitleEl = document.getElementById('track-title');
const songList = document.getElementById('song-list');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const visualizerBars = document.querySelectorAll('.bar');

// Populate song list dynamically
function populateSongList() {
    const songList = document.getElementById('song-list');
    songList.innerHTML = ''; // Clear existing dummy data
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.dataset.src = song.src;
        li.dataset.title = song.title;
        songList.appendChild(li);
    });
}

// Load song
function loadSong(index) {
    audio.src = songs[index].src;
    trackTitleEl.textContent = songs[index].title;
    updateActiveSong(index);
}

// Update active song in playlist
function updateActiveSong(index) {
    document.querySelectorAll('#song-list li').forEach((li, i) => {
        li.classList.toggle('active', i === index);
    });
}

// Play/pause toggle
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸';
        playPauseBtn.classList.remove('play');
        startVisualizer();
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
        playPauseBtn.classList.add('play');
        stopVisualizer();
    }
}

// Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = '⏸';
    playPauseBtn.classList.remove('play');
    startVisualizer();
}

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = '⏸';
    playPauseBtn.classList.remove('play');
    startVisualizer();
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent || 0;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Set volume
function setVolume() {
    audio.volume = volumeBar.value / 100;
}

// Visualizer functionality
let visualizerInterval;
function startVisualizer() {
    visualizerBars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });
}

function stopVisualizer() {
    visualizerBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
}

// Load dark mode preference
function loadDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
}

// Social links functionality (placeholder)
function handleSocialLink(e) {
    e.preventDefault();
    const platform = e.target.textContent.split(' ')[1];
    alert(`Redirecting to ${platform}... (This is a placeholder)`);
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', (e) => {
    const duration = audio.duration;
    audio.currentTime = (e.target.value / 100) * duration;
});
volumeBar.addEventListener('input', setVolume);
audio.addEventListener('ended', nextSong);
darkModeToggle.addEventListener('click', toggleDarkMode);

// Playlist click
songList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const index = Array.from(songList.children).indexOf(e.target);
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
        playPauseBtn.textContent = '⏸';
        playPauseBtn.classList.remove('play');
        startVisualizer();
    }
});

// Social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', handleSocialLink);
});

// Playlist toggle functionality
const playlistToggle = document.getElementById('playlist-toggle');
const playlistSection = document.querySelector('.playlist-section');

playlistToggle.addEventListener('click', () => {
    playlistSection.classList.toggle('hidden');
    playlistToggle.textContent = playlistSection.classList.contains('hidden') ? 'Show' : 'Hide';
});

// Auto-hide playlist when song is selected
songList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const index = Array.from(songList.children).indexOf(e.target);
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
        playPauseBtn.textContent = '⏸';
        playPauseBtn.classList.remove('play');
        startVisualizer();

        // Hide playlist after song selection
        playlistSection.classList.add('hidden');
        playlistToggle.textContent = 'Show';
    }
});

// Load first song and preferences on page load
loadSongs();
loadDarkMode();

// PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
