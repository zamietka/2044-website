const musicContainer = document.querySelector('.musicplayer')
const playButton = document.querySelector('.play')
const previousButton = document.querySelector('.previous')
const nextButton = document.querySelector('.next')
const musicProgress = document.querySelector('.musicprogress')
const musicAudio = document.querySelector('#audio')
const progressContainer = document.querySelector('.progresscontainer')
const musicTitle = document.querySelector('.songname')
const musicCat = document.querySelector('#musiccat')
let isPlaying = 0

//Song titles
//const songList = ['lala','Savestate - Evil Dr. Cool & His Radical Sunglasses','Gyms - Dog Town']

const songList = [
  {
    title: 'lala',
    src: 'https://example.com/audio/lala.mp3'
  },
  {
    title: 'Savestate - Evil Dr. Cool & His Radical Sunglasses',
    src: 'https://docs.google.com/uc?export=download&id=1l8U5Zo655AHmHh2iaIo6S6oTT1Z2kTWV'
  },
  {
    title: 'Gyms - Dog Town',
    src: 'https://example.com/audio/gyms.mp3'
  }
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let songIndex = getRandomInt(songList.length);

loadSong(songList[songIndex])



function loadSong(song) {
  musicTitle.innerText = song.title;
  musicAudio.src = song.src;
}

function playSong() {
  playButton.innerHTML = "Pause";
  musicAudio.play()
  musicCat.src ="images/musiccat2.gif"
}

function pauseSong () {
    playButton.innerHTML = "Play";
    musicAudio.pause()
    musicCat.src ="images/musiccat.gif"
}

function prevSong () {
  songIndex--

  if(songIndex < 0) {
    songIndex = songList.length - 1
  }

  loadSong(songList[songIndex])
  pauseSong()
  musicProgress.style.width = 0;
}

function nextSong () {
  songIndex++

  if(songIndex >= songList.length) {
    songIndex = 0
  }

  loadSong(songList[songIndex])
  pauseSong()
  musicProgress.style.width = 0;
}

function updateProgress (e) {
  var {duration, currentTime} = e.srcElement
  var progressPercent = (currentTime / duration) * 100
  musicProgress.style.width = `${progressPercent}%`
  if (progressPercent == 100) {
    nextSong()
    playSong()
  }
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clickX / width) * duration
}
//Event listeners

playButton.addEventListener('click', () =>{
  isPlaying = isPlaying + 1

  if(isPlaying > 1) {
  isPlaying = 0
  pauseSong()
} else {
  playSong()

}
})

previousButton.addEventListener('click', prevSong)

nextButton.addEventListener('click', nextSong)

musicAudio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

