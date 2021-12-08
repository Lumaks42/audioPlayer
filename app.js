// || карусель ||

const carousel = [...document.querySelectorAll('.section__carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= carousel.length - 1){
        carouselImageIndex = 0;
    }else{
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');    
}

setInterval(() => {
    changeCarousel();
}, 3000);

// || кнопка музыкального плеера ||

const musicPlayerSection = document.querySelector('.section__music-player');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if(clickCount >= 2){
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
})

// || назад домой ||

const backToHomeBtn = document.querySelector('.section__music-player .back-btn');

backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})

// || активировать плейлист ||

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.section__music-player .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})


// || возвращение к плееру ||

const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
})

// || навигация невидима ||

// || музыка

let currentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

// || блок всех этих кнопок тута

const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

// || кнопка плеей\стоп

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

// || функция для перелистывания треков

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);

// || создаю функцию для временного бара

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0` + sec;
    }

    return `${min} : ${sec}`;
}

// || события секундной линии ||

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        }else{
            forwardBtn.click();
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

// || кнопка вперед ||

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

// || кнопка назад || 

backwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})

// || звуковой бегунок ||

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

queue.forEach((item, i) => {
    item.addEventListener('click', () =>{
        setMusic(i);
        playBtn.click();
    })
})


