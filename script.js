const audio = document.querySelector('audio');
const playBtn = document.getElementById('play');
const nextBtn =  document.getElementById('next');
const prevBtn =  document.getElementById('prev');
const image = document.querySelector('img');
const title = document.querySelector('h2');
const singer = document.querySelector('h3');
const progress  =  document.getElementById('progress');
const lengthOfSong =  document.getElementById('Duration');
const playedTime = document.getElementById('currentTime');
const prpgressContainer =  document.getElementById('progressContainer');
let isPlaying =false;

let index = 0;


const songs = [
    {
        name : 'Mann Bharryaa 2.0',
        Title: 'Mann Bharraya 2.0',
        Singer: 'B-Park'
    },
    {
        name : 'Raataan Lambiyan',
        Title: 'Raataan Lambiyan',
        Singer: 'Kamal Khan'
    },
    {
        name : 'Ranjha',
        Title: 'Ranjha',
        Singer: 'Jasleen Royal, B-Park'
    },
    {
        name : 'Haan-Tu-Hain',
        Title: 'Haan-Tu-Hain',
        Singer: 'KK, Pritam Chakraborty'
    },
    {
        name : 'Hum-Dum',
        Title: 'Hum-Dum',
        Singer: 'AR Rahman, Gulzar'
    },
    {
        name : 'Shiddat',
        Title: 'Shiddat',
        Singer: 'Manan Bharadwaj'
    }
];




// function to play
function play(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    audio.play();
}


// function to pause
function pause(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    audio.pause();
}

// function loadsong
function loadsong(song){
    audio.setAttribute('src', `music/${song.name}.mp3`);
    image.setAttribute('src',`images/${song.name}.jpg`);
    title.textContent= `${song.name}`;
    singer.textContent= `${song.Singer}`;  
}


// function to playPrevious
function playPrev(){
    index--;
    if(index<0){
        index=songs.length-1;
       
    }
    // console.log(index);
    loadsong(songs[index]);
    play();
}

//function to set Timer
function setTimer(event){
    if(isPlaying){
    // console.log(event);
    const {duration, currentTime} =  event.srcElement;
    // current progress in %
    const currentProgressInPercent = (currentTime/duration)*100;
    // show progress bar 
    progress.style.width=`${currentProgressInPercent}%`;
    // duration minutes of song
    const minutes = Math.floor(duration/60);
    // duration seconds of song
    const seconds = Math.floor(duration%60);

    // if seconds are < 10  then set as MM:0S
    if(seconds<10){
        lengthOfSong.textContent = `${minutes}:0${seconds}`;
    }
    else{
    // if seconds are calculated then only set values
        if(seconds){
        lengthOfSong.textContent = `${minutes}:${seconds}`;
        }
    }

    // setting the current time progress
    const progressTimeMinutes  = Math.floor(currentTime/60);
    const progressTimeSeconds = Math.floor(currentTime%60);
    playedTime.textContent=`${progressTimeMinutes}:${progressTimeSeconds}`;
    }
    // console.log(event.srcElement.currentTime , event.srcElement.duration );
}

// function to change current time on clicking the progressbar

function changeCurrentTime(e){
    if(isPlaying){
    const width  =  this.clientWidth;
    const clickDistance =  e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickDistance/width) * duration;
    // console.log(e);
    // console.log(this.clientWidth);
    // console.log(this);
    }
}


// function to playNext
function playNext(){
    index++;
    if(index>songs.length-1){
        index=0;
    }
    // console.log(index);
    loadsong(songs[index]);
    play();
}


playBtn.addEventListener('click', () => (isPlaying ? pause() : play()));
nextBtn.addEventListener('click',playNext);
prevBtn.addEventListener('click',playPrev);
audio.addEventListener('timeupdate',setTimer);
prpgressContainer.addEventListener('click',changeCurrentTime);
loadsong(songs[0]);