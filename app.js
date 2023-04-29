/*
                    1. Render songs-->ok
                    2. Scroll to top-->ok
                    3. Play, Pause, Seek--> ok
                    4. CD rotate-->ok
                    5. Next, Prev-->ok
                    6. Random-->ok
                    7. Next and Repeat when ended-->ok
                    8. Active song
                    9. Scroll active song into view
                    10. Play song when click
                    11. add volume
                    */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlistList = $(".playList__list");
const songName = $(".song__name");
const songAuthor = $(".song__author");
const cdImg = $(".cd__img");
const audio = $("#audio");
const progressValue = $(".progress-bar__value");
const progressCurrentTime = $(".progress-time__current-time");
const progressDuration = $(".progress-time__duration");
const playBtn = $(".btn__play");
const progressBar = $(".progress-bar");
const cd = $(".cd");
const prevBtn = $(".btn__previous");
const nextBtn = $(".btn__next");
const randomBtn = $(".btn__random");
const repeatBtn = $(".btn__repeat");
const songPlayedList = new Set();
const songItemActive = $(".playList__item.active");
const songItem = $(".playList__item");
const favourite = $(".favourite-music__icon");
const volumeBtn = $(".volume");
const volumeBar = $(".volume-bar");
const volumeBarValue = $(".volume-bar__value");
const sun = $(".bxs-sun");
const moon = $(".bx-moon");
const container = $(".container");
const toggle = $(".toggle");
const showPlayListIcon = $(".list-music__icon");
const closePlayListIcon = $(".playList__close");
const playListContainer = $(".playList__container");
const playList = $(".playList");

const app = {
  currentIndex: 0,
  currentVolume: 1,
  isPlaying: false,
  isHoldProgressBar: false,
  isRandom: false,
  isRepeat: false,
  isFavourite: false,
  isMute: false,
  isHoldVolumeBar: false,

  songs: [
    {
      nameSong: "Tạm biệt nhé",
      singer: "Lynk Lee",
      path: "./assets/music/tamBietNhe.mp3",
      image: "./assets/img/lynkLee.jpg",
    },
    {
      nameSong: "Dreamer",
      singer: "Jung Kook(BTS)",
      path: "./assets/music/dreamer.mp3",
      image: "./assets/img/jungkook.jpg",
    },
    {
      nameSong: "Ghé Qua",
      singer: "Dick x Tofu x PC",
      path: "./assets/music/gheQua.mp3",
      image: "./assets/img/gheQua.jpg",
    },
    {
      nameSong: "Gió",
      singer: "JanK",
      path: "./assets/music/gio.mp3",
      image: "./assets/img/gio.jpg",
    },
    {
      nameSong: "Hẹn em ở lần yêu thứ 2",
      singer: "Nguyenn x Đặng Tuấn Vũ xFreakD",
      path: "./assets/music/henEmOLanYeuThu2.mp3",
      image: "./assets/img/henEmOLanYeuThu2.jpg",
    },
    {
      nameSong: "Suýt nữa thì",
      singer: "Andiez",
      path: "./assets/music/suytNuaThi.mp3",
      image: "./assets/img/suytNuaThi.jpg",
    },
    {
      nameSong: "Nếu ngày ấy",
      singer: "SOOBIN",
      path: "./assets/music/neuNgayAy.mp3",
      image: "./assets/img/neuNgayAy.jpg",
    },
    {
      nameSong: "Thật ra em chẳng thương anh vậy đâu",
      singer: "Nguyenn x Đặng Tuấn Vũ xRIN",
      path: "./assets/music/thatRaEmChangThuongAnhVayDau.mp3",
      image: "./assets/img/thatRaEmChangThuongAnhVayDau.jpeg",
    },
    {
      nameSong: "Vì anh đâu có biết",
      singer: "Madihu ft. Vũ.",
      path: "./assets/music/viAnhDauCoBiet.mp3",
      image: "./assets/img/viAnhDauCoBiet.jpeg",
    },
  ],

  //render ra danh sách bài hát

  render() {
    const htmls = this.songs.map((song, index) => {
      return `<li class="playList__item ${
        index === this.currentIndex ? "active" : ""
      }"data-index="${index}">
    <div class="playList__item-img">
      <img src="${song.image}" alt="" />
    </div>
    <div class="playList__item-info">
      <h3 class="playList__item-name">${song.nameSong}</h3>
      <p class="playList__item-author">${song.singer}</p>
    </div>
    <div class="music-waves ${index === this.currentIndex ? "active" : ""}">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <sapn class="playList__item-option">
      <i class="fa-solid fa-ellipsis"></i>
    </sapn>
  </li>`;
    });
    playlistList.innerHTML = htmls.join("");
  },
  defineProperties() {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  //hàm scroll
  scrollToActiveSong() {
    setTimeout(() => {
      songItemActive.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center",
      });
    }, 300);
  },

  //khi tải trang thì lấy ra bài hát đầu tiên
  loadCurrentSong() {
    songName.textContent = this.currentSong.nameSong;
    songAuthor.textContent = this.currentSong.singer;
    cdImg.src = this.currentSong.image;
    audio.src = this.currentSong.path;
    progressValue.style.width = 0;
  },
  togglePlaylist() {
    playListContainer.classList.toggle("list-open");
  },
  handle() {
    const _this = this;

    //xử lí background

    sun.onclick = function () {
      container.style.backgroundImage =
        'url("./assets/img/backgroundMorning.png")';
      sun.classList.toggle("active");
      moon.classList.remove("active");
    };
    moon.onclick = function () {
      container.style.backgroundImage =
        'url("./assets/img/backgroundNight.png")';
      moon.classList.toggle("active");
      sun.classList.remove("active");
    };
    //xử lí show/hide playList
    showPlayListIcon.onclick = function () {
      _this.togglePlaylist();
    };
    closePlayListIcon.onclick = function () {
      _this.togglePlaylist();
    };
    playListContainer.onclick = function () {
      _this.togglePlaylist();
    };
    playList.onclick = function (e) {
      e.stopPropagation();
    };
    //Xử lí cd quay,dừng
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
    };
    const cdAnimate = cd.animate(
      [
        {
          transform: `rotate(360deg)`,
        },
      ],
      {
        duration: 10000, //quay 10s,
        iterations: Infinity,
      }
    );
    cdAnimate.pause();
    //khi click vào nút play thì phát nhạc
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    audio.onplay = function () {
      playBtn.classList.add("playing");
      _this.isPlaying = true;
      cdAnimate.play();
    };
    audio.onpause = function () {
      playBtn.classList.remove("playing");
      _this.isPlaying = false;
      cdAnimate.pause();
    };
    //khi thay đổi tiến trình của bài hát
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressValue.style.width = progressPercent + "%";
        //set durationTime và currentTime cho bài hát
        progressCurrentTime.textContent = _this.getMinutesSong(
          progressValue.style.width
        );
        progressDuration.textContent = _this.setMinutesSong();
      }
    };

    //xử lí khi tua video
    progressBar.onmousedown = function (e) {
      const seekTime = (e.offsetX / this.offsetWidth) * audio.duration;
      audio.currentTime = seekTime;
      _this.isHoldProgressBar = true;
    };
    progressBar.onmouseup = function (e) {
      if (_this.isHoldProgressBar) {
        const seekTime = (e.offsetX / this.offsetWidth) * audio.duration;
        audio.currentTime = seekTime;
      }
    };

    //xử lí khi nhấn vào nút next
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.random();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //xử lí khi nhân vào nút prev
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.random();
      } else {
        _this.prevSong();
      }

      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //xử lí khi nhấn vào nút random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    //xử lí khi nhấn vào nút repeat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    //xử lí khi click vào playList
    //chuyển bài hát khi nhấn vào bài hát khác

    playlistList.onclick = function (e) {
      const songNode = e.target.closest(".playList__item:not(.active)");
      const songOption = e.target.closest(".playList__item-option");
      if (songNode || songOption) {
        if (songNode && !songOption) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          _this.scrollToActiveSong();
          audio.play();
        }
        if (songOption) {
          alert("You just clicked the option button");
        }
      }
    };
    //xử lí nút yêu thích
    favourite.onclick = function () {
      _this.isFavourite = !_this.isFavourite;
      favourite.classList.toggle("active");
      const tooltip = this.querySelector("span");
      if (_this.isFavourite) {
        tooltip.textContent = "Remove Favourite";
        tooltip.style.bottom = "80%";
      } else {
        tooltip.textContent = "Add Favourite";
        tooltip.style.bottom = "70%";
      }
    };
    //xử lí khi nhân vào nút volume

    volumeBtn.onclick = function () {
      _this.isMute = !_this.isMute;
      volumeBtn.classList.toggle("active", _this.isMute);
      if (_this.isMute) {
        audio.volume = 0;
      } else {
        audio.volume = _this.currentVolume;
      }
    };

    volumeBar.onmousedown = function (e) {
      if (e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
        _this.currentVolume = (e.offsetX / this.offsetWidth).toFixed(2);
        audio.volume = _this.currentVolume;
        volumeBarValue.style.width = audio.volume * 100 + "%";
        if (audio.volume == 0) {
          _this.isMute = true;
        } else {
          _this.isMute = false;
        }
        _this.isHoldVolumeBar = true;
      }
    };
    volumeBar.onmouseup = function (e) {
      if (_this.isHoldVolumeBar) {
        if (e.offsexX >= 0 && e.offsetX <= this.offsetWidth) {
          _this.currentVolume = (e.offsetX / this.offsetWidth).toFixed(2);
          audio.volume = _this.currentVolume;
          volumeBarValue.style.width = audio.volume * 100 + "%";
          if (audio.volume == 0) {
            _this.isMute = true;
          } else {
            _this.isMute = false;
          }
        }
      }
    };
    audio.onvolumechange = function () {
      if (_this.isMute) {
        volumeBtn.classList.add("active");
        volumeBarValue.style.width = 0;
      } else {
        volumeBtn.classList.remove("active");
        volumeBarValue.style.width = this.volume * 100 + "%";
      }
    };

    //nhấn nút space thì play
    window.onkeydown = function (e) {
      if (e.which === 32) {
        playBtn.click();
      }
    };
  },
  //hàm next bài hát
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    this.scrollToActiveSong();
  },
  //hàm prev bài hát
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.scrollToActiveSong();
  },
  //hàm random
  random() {
    let random;
    do {
      random = Math.floor(Math.random() * this.songs.length);
    } while (songPlayedList.has(random));
    this.currentIndex = random;
    this.loadCurrentSong();
    songPlayedList.add(random);
    if (songPlayedList.length === this.songs.length) {
      songPlayedList.clear();
    }
    this.active();
  },

  // hàm lấy ra số phút của bài hát
  setMinutesSong() {
    const time = audio.duration;
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time - 60 * minutes)
      .toString()
      .padStart(2, "0");
    return (finalTime = minutes + ":" + seconds);
  },
  getMinutesSong() {
    const time = audio.currentTime;
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time - 60 * minutes)
      .toString()
      .padStart(2, "0");
    return (finalTime = minutes + ":" + seconds);
  },
  start() {
    this.defineProperties();
    this.loadCurrentSong();
    this.render();
    this.handle();
  },
};
app.start();
