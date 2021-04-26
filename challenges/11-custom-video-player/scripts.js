const player = document.querySelector('.viewer');
const playerBtn = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress');
const progressPercentage = document.querySelector('.progress__filled');
const skipForward = document.querySelector(`.player__button[data-skip='-10']`);
const skipBackward = document.querySelector(`.player__button[data-skip='25']`);
// const volumeControl = document.querySelector('input[name=volume]');
// const speedControl = document.querySelector('input[name=playbackRate]');
const sliders = document.querySelectorAll('.player__slider');

// I use a flag variable to keep track of the state of video but this can not cover all the user cases.
// player.paused is from wes's answer.
// let isPlaying = false;

let mouseDown = false;

const togglePlay = () => {
  // isPlaying ? player.pause() : player.play();
  // isPlaying ? (playerBtn.innerHTML = '►') : (playerBtn.innerHTML = '❚ ❚')
  // isPlaying = !isPlaying;
  player.paused ? player.play() : player.pause();
};

const updateBtn = () => {
  player.paused ? (playerBtn.innerHTML = '►') : (playerBtn.innerHTML = '❚ ❚');
};

function updateProgressBar() {
  const currentTime = this.currentTime;
  const flexPercentage = (currentTime / this.duration) * 100;
  progressPercentage.style.flexBasis = `${flexPercentage}%`;
}

const setProgress = (e) => {
  const time = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = time;
};

function onSkipBtnClick() {
  const skipTime = +this.dataset.skip;
  player.currentTime += skipTime;
}

// refactor my code to be cleaner and simpler

// function onVolumeChange() {
//   player.volume = this.value;
// }
// function onSpeedChange() {
//   player.playbackRate = this.value;
// }

function onSliderChange() {
  player[this.name] = this.value;
}

[playerBtn, player].forEach((el) => el.addEventListener('click', togglePlay));
// I didn't add these eventListeners
player.addEventListener('play', updateBtn);
player.addEventListener('pause', updateBtn);

[skipForward, skipBackward].forEach((btn) =>
  btn.addEventListener('click', onSkipBtnClick)
);

player.addEventListener('timeupdate', updateProgressBar);

progressBar.addEventListener('mousedown', () => (mouseDown = true));
progressBar.addEventListener('mouseup', () => (mouseDown = false));
progressBar.addEventListener('mousemove', (e) => mouseDown && setProgress(e));
progressBar.addEventListener('click', (e) => setProgress(e));

// volumeControl.addEventListener('change', onVolumeChange);
// volumeControl.addEventListener('mousemove', onVolumeChange);
// speedControl.addEventListener('change', onSpeedChange);
// speedControl.addEventListener('mousemove', onSpeedChange);

sliders.forEach((slider) => slider.addEventListener('change', onSliderChange));
sliders.forEach((slider) =>
  slider.addEventListener('mousemove', onSliderChange)
);
