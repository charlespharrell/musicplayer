let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar')
const songName = document.querySelector('.music-name')
const artistName = document.querySelector('.artist-name');
const musicImage = document.querySelector('.music-image')
const currentTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.song-duration')
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn')
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
     if(playBtn.className.includes('pause')){
        music.play();
    } else{
        music.pause()
    }
    playBtn.classList.toggle('pause')
    musicImage.classList.toggle('play')

})  

const playMusic = (i) => {  
    seekBar.value = 0;
    let song = songs[i]
    currentMusic = i
    music.src = song.path

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist
    musicImage.style.backgroundImage = `url('${song.cover}')`

    currentTime.innerHTML = '00:00'
    setTimeout(()=>{
        seekBar.max = music.duration
        console.log(music.duration)
        musicDuration.innerHTML = formatTime(music.duration)
    }, 300)
}
  playMusic(0);

  const formatTime = (time) =>{
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }

    let sec = Math.floor(time%60)
    if(sec<10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`
  }

  setInterval(()=>{
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime)== Math.floor(seekBar.max)){
        forwardBtn.click()
    }
  }, 500)

    seekBar.addEventListener('change', () =>{
        music.currentTime = seekBar.value;
    })

const musicPlay = () =>{
    music.play();
    playBtn.classList.remove('pause')
    musicImage.classList.add('play')
}

forwardBtn.addEventListener('click', () =>{
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    playMusic(currentMusic);
    musicPlay()
})

backwardBtn.addEventListener('click', () =>{
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    playMusic(currentMusic);
    musicPlay()
})