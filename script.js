document.addEventListener("DOMContentLoaded", () => {
  const defaultCover = "assets/img/profile.jpeg";

  const playlist = [
    { title: "Bahagia Lagi", src: "assets/song/mp3/Bahagia Lagi.mp3", cover: "assets/song/cover/Bahagia Lagi.jpeg" },
    { title: "Bujang Ganong", src: "assets/song/mp3/Bujang Ganong.mp3", cover: "assets/song/cover/Bujang Ganong.jpeg" },
    { title: "Dunia yang Nanti", src: "assets/song/mp3/Dunia yang Nanti.mp3", cover: "assets/song/cover/Dunia yang Nanti.jpeg" },
    { title: "Folded", src: "assets/song/mp3/Folded.mp3", cover: "assets/song/cover/Folded.jpeg" },
    { title: "Girl You Loud", src: "assets/song/mp3/Girl You Loud.mp3", cover: "assets/song/cover/Girl You Loud.jpeg" },
    { title: "Humnava (Slowed + Reverb)", src: "assets/song/mp3/Humnava.mp3", cover: defaultCover },
    { title: "Joga Essa Rabeta", src: "assets/song/mp3/Joga Essa Rabeta.mp3", cover: "assets/song/cover/Joga Essa Rabeta.jpeg" },
    { title: "Kaulah Kamuku", src: "assets/song/mp3/Kaulah Kamuku.mp3", cover: "assets/song/cover/Kaulah Kamuku.jpeg" },
    { title: "Kembali Pulang", src: "assets/song/mp3/Kembali Pulang.mp3", cover: defaultCover },
    { title: "Lush Life x Unforgettable", src: "assets/song/mp3/Lush Life x Unforgettable.mp3", cover: "assets/song/cover/Lush Life x Unforgettable.jpeg" },
    { title: "Putri Iklan", src: "assets/song/mp3/Putri Iklan.mp3", cover: "assets/song/cover/Putri Iklan.jpeg" },
    { title: "Sunn Raha Hai", src: "assets/song/mp3/Sunn Raha Hai.mp3", cover: "assets/song/cover/Sunn Raha Hai.jpeg" },
    { title: "Supernatural", src: "assets/song/mp3/Supernatural.mp3", cover: "assets/song/cover/Supernatural.jpeg" },
    { title: "Sword and Shield", src: "assets/song/mp3/Sword and Shield.mp3", cover: "assets/song/cover/Sword and Shield.jpeg" },
    { title: "Terpikat Senyummu", src: "assets/song/mp3/Terpikat Senyummu.mp3", cover: defaultCover },
    { title: "Treat You Better", src: "assets/song/mp3/Treat You Better.mp3", cover: "assets/song/cover/Treat You Better.jpeg" },
    { title: "Unforgettable", src: "assets/song/mp3/Unforgettable.mp3", cover: "assets/song/cover/Unforgettable.jpeg" },
    { title: "Weyangkari", src: "assets/song/mp3/Weyangkari.mp3", cover: "assets/song/cover/Weyangkari.jpeg" }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  const audio = document.getElementById("audio-element");
  const playBtn = document.getElementById("card-play-btn");
  const prevBtn = document.getElementById("card-prev-btn");
  const nextBtn = document.getElementById("card-next-btn");
  const trackTitle = document.getElementById("card-track-title");
  const trackArtist = document.getElementById("card-track-artist");
  const trackCover = document.getElementById("big-player-cover");
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.getElementById("progress-container");
  const currentTimeEl = document.getElementById("current-time");
  const durationTimeEl = document.getElementById("duration-time");
  const statusDot = document.querySelector(".status-dot");
  const queueList = document.getElementById("card-queue-list");

  // Fallback cover
  if (trackCover) {
    trackCover.addEventListener("error", () => {
      trackCover.src = defaultCover;
    });
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function renderQueue() {
    if (!queueList) return;
    queueList.innerHTML = "";
    playlist.forEach((track, idx) => {
      const item = document.createElement("div");
      item.className = `queue-item ${idx === currentTrackIndex ? "active" : ""}`;
      item.innerHTML = `
        <div class="queue-item-left">
          <span class="queue-num">${idx + 1}</span>
          <span class="queue-title">${track.title}</span>
        </div>
        <span class="queue-icon">${idx === currentTrackIndex && isPlaying ? "⏸" : "▶"}</span>
      `;
      item.addEventListener("click", () => {
        if (currentTrackIndex === idx && isPlaying) {
          pauseAudio();
        } else {
          currentTrackIndex = idx;
          loadTrack(currentTrackIndex);
          playAudio();
        }
      });
      queueList.appendChild(item);
    });
  }

  function loadTrack(index) {
    const track = playlist[index];
    audio.src = encodeURI(track.src);
    audio.load();
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = "ruh_na_noir archive";
    if (trackCover) trackCover.src = track.cover || defaultCover;
    renderQueue();
  }

  function playAudio() {
    audio.play().then(() => {
      isPlaying = true;
      if (playBtn) playBtn.textContent = "⏸";
      if (statusDot) statusDot.classList.add("active");
      renderQueue();
    }).catch(err => {
      console.warn("Autoplay / Audio ditolak:", err);
      isPlaying = false;
      if (playBtn) playBtn.textContent = "▶";
      if (statusDot) statusDot.classList.remove("active");
    });
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    if (playBtn) playBtn.textContent = "▶";
    if (statusDot) statusDot.classList.remove("active");
    renderQueue();
  }

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (audio.paused || !isPlaying) {
        playAudio();
      } else {
        pauseAudio();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      playAudio();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrackIndex);
      playAudio();
    });
  }

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
      if (durationTimeEl) durationTimeEl.textContent = formatTime(audio.duration);
    }
  });

  if (progressContainer) {
    progressContainer.addEventListener("click", (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
      }
    });
  }

  audio.addEventListener("ended", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
  });

  loadTrack(0);
});

function togglePoetry(header) {
  const body = header.nextElementSibling;
  const isOpen = body.classList.contains("open");
  document.querySelectorAll(".poetry-body").forEach(b => b.classList.remove("open"));
  if (!isOpen) {
    body.classList.add("open");
  }
}

function openLightbox(src, caption, link) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  const lnk = document.getElementById("lightbox-link");

  if (lb && img && cap && lnk) {
    img.src = src;
    cap.textContent = caption;
    lnk.href = link;
    lb.classList.add("active");
  }
}

function closeLightbox(e) {
  const lb = document.getElementById("lightbox");
  if (lb) lb.classList.remove("active");
}

/* ==========================================================
   INTERAKSI KABUT AKSARA & SERPIHAN BINTANG DI LATAR
   ========================================================== */
(function() {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  // Kumpulan karakter: fragmen fana, aksara, dan simbol bintang
  const chars = ["a", "r", "s", "i", "p", "n", "o", "i", "r", "✦", "✧", "⋆", "v", "i", "s", "w", "a", "s", "a", "x", "z", "0", "1", "·"];
  const stars = ["✦", "✧", "⋆", "★"];
  const particles = [];
  const particleCount = Math.floor((width * height) / 8000); // Kepadatan adaptif sesuai resolusi layar

  const mouse = { x: -1000, y: -1000, radius: 120 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class GlyphParticle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseChar = chars[Math.floor(Math.random() * chars.length)];
      this.currentChar = this.baseChar;
      this.size = Math.random() * 6 + 10; // Ukuran 10px - 16px
      this.alpha = Math.random() * 0.08 + 0.03; // Sangat samar di awal (tidak bikin pusing)
      this.baseAlpha = this.alpha;
      this.vx = (Math.random() - 0.5) * 0.25; // Gerak mengapung lambat
      this.vy = (Math.random() - 0.5) * 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Pantulan lembut di tepian layar
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Hitung jarak ke kursor mouse
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        // Efek kursor lewat: Menyala terang dan berubah jadi bintang/aksara tajam
        const factor = 1 - dist / mouse.radius;
        this.alpha = this.baseAlpha + factor * 0.65;
        this.currentChar = stars[Math.floor(Math.random() * stars.length)];
      } else {
        // Perlahan kembali ke bentuk huruf dan transparan semula
        if (this.alpha > this.baseAlpha) {
          this.alpha -= 0.015;
        } else {
          this.currentChar = this.baseChar;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.font = `${this.size}px 'Cinzel', serif`;
      ctx.fillStyle = `rgba(236, 236, 241, ${this.alpha})`;
      ctx.fillText(this.currentChar, this.x, this.y);
      ctx.restore();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new GlyphParticle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
})();