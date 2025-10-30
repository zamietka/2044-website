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

const songList = [
  {
    title: 'Commodore 64 Lemmings Music - Lemming 1 (Pachelbel\'s Canon)',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/Commodore%2064%20Lemmings%20Music%20-%20Lemming%201%20(Pachelbel\'s%20Canon).mp3'
  },
  {
    title: 'A Beautiful Song - 8 bit',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/A%20Beautiful%20Song%20-%208%20bit.mp3'
  },
  {
    title: 'Savestate - Evil Dr. Cool & His Radical Sunglasses',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/Savestate%20-%20Evil%20Dr.%20Cool%20&%20His%20Radical%20Sunglasses.mp3'
  },
  {
    title: 'Deltarune - The Legend',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/Deltarune%20-%20The%20Legend.mp3'
  },
  {
    title: 'DuckTales Music (NES) - The Himalayas Theme',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/DuckTales%20Music%20(NES)%20-%20The%20Himalayas%20Theme.mp3'
  },
  {
    title: 'EarthBound Beginnings - Being friends',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/EarthBound%20Beginnings%20-%20Being%20friends.mp3'
  },
  {
    title: 'FAITH Soundtrack l Beethoven.mp3',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/FAITH%20Soundtrack%20l%20Beethoven.mp3'
  },
  {
    title: 'In The End [8 Bit Tribute to Chester Bennington (RIP) & Linkin Park] - 8 Bit Universe.mp3',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/In%20The%20End%20%5B8%20Bit%20Tribute%20to%20Chester%20Bennington%20(RIP)%20&%20Linkin%20Park%5D%20-%208%20Bit%20Universe.mp3'
  },
  {
    title: 'Legend of Zelda, The (NES) Music - Ending Theme.mp3',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/Legend%20of%20Zelda,%20The%20(NES)%20Music%20-%20Ending%20Theme.mp3'
  },
  {
    title: 'Pokémon Gold & Silver - Routes 26-27.mp3',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/Pok%C3%A9mon%20Gold%20&%20Silver%20-%20Routes%2026-27.mp3'
  },
  {
    title: 'Zombie [8 Bit Tribute to Bad Wolves and the Cranberries] - 8 Bit Universe.mp3',
    src: 'https://github.com/zamietka/2044-website/raw/refs/heads/main/neocities-2044/Zombie%20%5B8%20Bit%20Tribute%20to%20Bad%20Wolves%20and%20the%20Cranberries%5D%20-%208%20Bit%20Universe.mp3'
  },
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

