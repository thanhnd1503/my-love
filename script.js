// ===== QUIET LUXURY & WHITE PETALS CANVAS =====
const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');
let petals = [];
let stardustMotes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initPetals() {
  petals = [];
  stardustMotes = [];

  // Elegant white floral petals (daisy, jasmine, lily petals)
  const petalCount = Math.floor((canvas.width * canvas.height) / 18000) + 18;
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 9 + 8,
      speedY: Math.random() * 0.75 + 0.5,
      speedX: Math.random() * 0.45 - 0.15,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
      swayWidth: Math.random() * 1.6 + 0.8,
      angle: Math.random() * 360,
      spinSpeed: (Math.random() - 0.5) * 1.2,
      aspectRatio: Math.random() * 0.35 + 0.45, // Petal oval shape
      alpha: Math.random() * 0.45 + 0.4,
      hueTint: Math.random() > 0.5 ? 42 : 55 // subtle warm champagne tint
    });
  }

  // Delicate stardust motes
  const moteCount = Math.floor((canvas.width * canvas.height) / 14000) + 12;
  for (let i = 0; i < moteCount; i++) {
    stardustMotes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.6,
      speedY: -Math.random() * 0.35 - 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      pulseOffset: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}

function drawPetal(x, y, size, aspectRatio, angle, alpha, hueTint) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);

  // Soft romantic white petal with subtle warm pearlescent gradient
  const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, size);
  grad.addColorStop(0, `hsla(${hueTint}, 40%, 99%, ${alpha})`);
  grad.addColorStop(0.7, `hsla(${hueTint}, 45%, 95%, ${alpha * 0.88})`);
  grad.addColorStop(1, `hsla(${hueTint}, 65%, 88%, ${alpha * 0.5})`);

  ctx.fillStyle = grad;
  ctx.shadowColor = `hsla(45, 80%, 75%, ${alpha * 0.35})`;
  ctx.shadowBlur = 8;

  ctx.beginPath();
  // Draw organic petal curvature
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * aspectRatio, -size * 0.5, size * aspectRatio, size * 0.5, 0, size);
  ctx.bezierCurveTo(-size * aspectRatio, size * 0.5, -size * aspectRatio, -size * 0.5, 0, -size);
  ctx.fill();

  ctx.restore();
}

function renderScene(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw subtle rising stardust
  stardustMotes.forEach(m => {
    m.y += m.speedY;
    m.x += m.speedX;
    if (m.y < -10) m.y = canvas.height + 10;
    if (m.x < -10) m.x = canvas.width + 10;
    if (m.x > canvas.width + 10) m.x = -10;

    const pulse = Math.sin(time * m.pulseSpeed + m.pulseOffset) * 0.4 + 0.6;
    const a = m.alpha * pulse;

    ctx.beginPath();
    ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${a * 0.65})`;
    ctx.shadowColor = `rgba(245, 223, 147, ${a})`;
    ctx.shadowBlur = 6;
    ctx.fill();
  });

  // 2. Draw falling & swaying white petals
  petals.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayWidth;
    p.angle += p.spinSpeed;

    if (p.y > canvas.height + 25) {
      p.y = -25;
      p.x = Math.random() * canvas.width;
    }
    if (p.x < -25) p.x = canvas.width + 25;
    if (p.x > canvas.width + 25) p.x = -25;

    drawPetal(p.x, p.y, p.size, p.aspectRatio, p.angle, p.alpha, p.hueTint);
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(renderScene);
}

resizeCanvas();
initPetals();
requestAnimationFrame(renderScene);

window.addEventListener('resize', () => {
  resizeCanvas();
  initPetals();
});

// ===== RISING DELICATE STARDUST PARTICLES (DOM) =====
const stardustContainer = document.getElementById('stardustContainer');

function spawnStardust() {
  if (!stardustContainer) return;
  const spark = document.createElement('div');
  spark.className = 'stardust-spark';

  const size = Math.random() * 5 + 2;
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 7 + 6;

  spark.style.width = `${size}px`;
  spark.style.height = `${size}px`;
  spark.style.left = `${startX}px`;
  spark.style.animationDuration = `${duration}s`;

  stardustContainer.appendChild(spark);

  setTimeout(() => {
    spark.remove();
  }, duration * 1000 + 200);
}

setInterval(spawnStardust, 400);
for (let i = 0; i < 16; i++) {
  setTimeout(spawnStardust, i * 220);
}

// ===== SECTION NAVIGATION =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
}

// ===== HAUTE COUTURE SILK GIFT BOX OPENING =====
const giftTrigger = document.getElementById('giftTrigger');
const openGiftBtn = document.getElementById('openGiftBtn');
const giftBox = document.getElementById('giftBox');
let giftOpened = false;

function openHauteGiftBox() {
  if (giftOpened) return;
  giftOpened = true;

  playMusic();
  playBeep(620);

  // 1. Open gift box animation (bow unravelling + lid rising)
  if (giftBox) giftBox.classList.add('opened');

  // 2. Play celebratory opening chime
  setTimeout(() => {
    playBeep(780);
  }, 220);

  // 3. Smooth transition to Section 2 (Love letter)
  setTimeout(() => {
    showSection('section-letter');
    setTimeout(startTypewriter, 500);
  }, 1100);
}

if (giftTrigger) giftTrigger.addEventListener('click', openHauteGiftBox);
if (openGiftBtn) {
  openGiftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openHauteGiftBox();
  });
}

// ===== LOVE LETTER FOR VIRGO & BẠCH LẠP KIM (QUIET LUXURY & WHITE FLORAL) =====
const quietLuxuryLetter = `Gửi Bé Yêu của anh...

Giữa thế giới vội vã và ồn ào, em xuất hiện như một đóa hoa trắng tinh khôi, dịu dàng và thanh khiết nhất.

Người ta bảo mệnh Bạch Lạp Kim là thứ vàng tinh luyện trong ngọn nến sáng — thanh khiết, ấm áp và chân thành. Cũng giống như em vậy, một cô gái Xử Nữ với trái tim ấm áp, sự tinh tế đến từng chi tiết và luôn mang lại cảm giác bình yên đến lạ kỳ mỗi khi ở cạnh.

Ở bên em, từng khoảnh khắc giản đơn bỗng hóa thành những điều ngọt ngào nhất. Nụ cười rạng rỡ của em tựa ánh ban mai xua tan mọi mỏi mệt trong lòng anh.

Anh nhận ra rằng, điều tuyệt vời nhất không phải là những thứ xa hoa lộng lẫy, mà chính là được cùng em sẻ chia những điều nhỏ bé, dịu dàng mỗi ngày.

Và hôm nay, trước đóa hoa trắng thuần khiết và lời hẹn ước từ trái tim, anh muốn hỏi em một điều chân thành nhất... ✨`;

let typeIndex = 0;
const typewriterEl = document.getElementById('typewriter');

function startTypewriter() {
  typewriterEl.innerHTML = '<span class="cursor"></span>';
  typeIndex = 0;
  typeNext();
}

function typeNext() {
  if (typeIndex < quietLuxuryLetter.length) {
    const cursor = typewriterEl.querySelector('.cursor');
    const char = quietLuxuryLetter[typeIndex];

    if (char === '\n') {
      cursor.insertAdjacentHTML('beforebegin', '<br>');
    } else {
      cursor.insertAdjacentText('beforebegin', char);
    }

    typeIndex++;

    // Smooth auto-scroll stationery paper on mobile & desktop
    const stationeryPaper = document.querySelector('.stationery-paper');
    if (stationeryPaper) {
      stationeryPaper.scrollTop = stationeryPaper.scrollHeight;
    }

    if (char === '\n' || typeIndex % 12 === 0) {
      const section = document.getElementById('section-letter');
      if (section && cursor) {
        cursor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    let delay = 35;
    if (char === '.' || char === '!' || char === '?') delay = 350;
    else if (char === ',') delay = 180;
    else if (char === '\n') delay = 250;
    else if (char === '…') delay = 450;

    setTimeout(typeNext, delay);
  } else {
    const cursor = typewriterEl.querySelector('.cursor');
    if (cursor) {
      setTimeout(() => {
        cursor.remove();
        const signature = document.getElementById('letterSignature');
        if (signature) {
          signature.classList.remove('hidden');

          setTimeout(() => {
            signature.scrollIntoView({ behavior: 'smooth', block: 'end' });
            const stationeryPaper = document.querySelector('.stationery-paper');
            if (stationeryPaper) {
              stationeryPaper.scrollTop = stationeryPaper.scrollHeight;
            }
          }, 200);
        }
      }, 600);
    }
  }
}

// ===== BUTTON: Letter → Question =====
document.getElementById('btnToQuestion').addEventListener('click', () => {
  showSection('section-question');
});

// ===== SLIPPERY "NO" BUTTON (Hops 4 times, shrinks, vanishes, then center 3-2-1 explosion!) =====
const btnNo = document.getElementById('btnNo');
const btnYes = document.getElementById('btnYes');
let noClicks = 0;
const MAX_NO_CLICKS = 4;

const noStages = [
  { text: 'Chạy trốn nè...', emoji: '🕊️', scale: 0.82 },
  { text: 'Bay mất tiêu rồi!', emoji: '💨', scale: 0.68 },
  { text: 'Đừng bấm nữa mà...', emoji: '🥺', scale: 0.54 },
  { text: 'Biến mất luôn nè!', emoji: '🌪️', scale: 0.38 }
];

// Web Audio API synthesized sound effects
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playBeep(freq = 520) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.setValueAtTime(0.18, ctx.currentTime);
    gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) { }
}

function playBoomSound() {
  try {
    const ctx = getAudioContext();
    // Sub bass drop
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(170, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.9);
    gain.setValueAtTime(0.65, ctx.currentTime);
    gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.95);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.0);

    // Noise burst
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.6);
    const noiseGain = ctx.createGain();
    noiseGain.setValueAtTime(0.6, ctx.currentTime);
    noiseGain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + 0.7);
  } catch (e) { }
}

function handleNoClick() {
  if (noClicks >= MAX_NO_CLICKS) return;
  noClicks++;

  const stage = noStages[noClicks - 1];

  if (noClicks < MAX_NO_CLICKS) {
    // Append directly to document.body to bypass any backdrop-filter containing block quirks
    if (btnNo.parentElement !== document.body) {
      document.body.appendChild(btnNo);
    }

    btnNo.querySelector('.btn-emoji').textContent = stage.emoji;
    btnNo.querySelector('span:last-child').textContent = stage.text;

    const btnW = btnNo.offsetWidth || 150;
    const btnH = btnNo.offsetHeight || 50;
    const padX = 24;
    const padY = 70;
    const maxX = Math.max(padX, window.innerWidth - btnW - padX);
    const maxY = Math.max(padY, window.innerHeight - btnH - padY);
    const randX = Math.floor(Math.random() * (maxX - padX) + padX);
    const randY = Math.floor(Math.random() * (maxY - padY) + padY);

    btnNo.style.position = 'fixed';
    btnNo.style.left = `${randX}px`;
    btnNo.style.top = `${randY}px`;
    btnNo.style.zIndex = '9999';
    btnNo.style.transform = `scale(${stage.scale})`;

    btnYes.style.transform = `scale(${1 + noClicks * 0.08})`;
    playBeep(360 + noClicks * 90);
  } else {
    btnNo.querySelector('.btn-emoji').textContent = stage.emoji;
    btnNo.querySelector('span:last-child').textContent = stage.text;
    btnNo.style.transform = `scale(${stage.scale})`;
    btnNo.classList.add('disappearing');

    playBeep(680);

    setTimeout(() => {
      btnNo.style.display = 'none';
      startCenterCountdown();
    }, 420);
  }
}

btnNo.addEventListener('click', handleNoClick);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  handleNoClick();
}, { passive: false });

function startCenterCountdown() {
  const overlay = document.getElementById('screenCountdown');
  const numEl = document.getElementById('countdownNumber');
  const subtextEl = document.getElementById('countdownSubtext');

  overlay.classList.remove('hidden');
  numEl.className = 'countdown-number';

  // Number 3
  numEl.textContent = '3';
  subtextEl.textContent = 'Đang tự hủy tính năng từ chối...';
  playBeep(520);

  // Number 2
  setTimeout(() => {
    numEl.textContent = '2';
    playBeep(660);
    numEl.style.animation = 'none';
    numEl.offsetHeight; // force reflow
    numEl.style.animation = null;
  }, 1000);

  // Number 1
  setTimeout(() => {
    numEl.textContent = '1';
    playBeep(840);
    numEl.style.animation = 'none';
    numEl.offsetHeight; // force reflow
    numEl.style.animation = null;
  }, 2000);

  // DETONATION (BOOM!)
  setTimeout(() => {
    numEl.textContent = '💥 BÙM! 💥';
    numEl.classList.add('boom-text');
    subtextEl.textContent = 'NÚT TỪ CHỐI ĐÃ PHÁT NỔ HOÀN TOÀN!';

    playBoomSound();

    // 1. Screen flash
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    // 2. Screen earthquake
    document.body.classList.add('screen-quake');
    const questionCard = document.querySelector('.question-card');
    if (questionCard) questionCard.classList.add('screen-quake');
    setTimeout(() => {
      document.body.classList.remove('screen-quake');
      if (questionCard) questionCard.classList.remove('screen-quake');
    }, 700);

    // 3. Blast particles exploding from center of screen!
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const particleColors = ['#d4af37', '#f5df93', '#ff1744', '#ffffff', '#edd69a', '#faf7f2'];
    for (let i = 0; i < 65; i++) {
      const p = document.createElement('div');
      p.className = 'blast-particle';
      const size = Math.random() * 16 + 6;
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = color;
      p.style.boxShadow = `0 0 16px ${color}`;
      p.style.left = `${centerX}px`;
      p.style.top = `${centerY}px`;

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 340 + 130;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      p.animate([
        { transform: 'translate(0, 0) scale(1.6)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 600,
        easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
        fill: 'forwards'
      });

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1800);
    }

    // 4. Close countdown overlay and show warning banner!
    setTimeout(() => {
      overlay.classList.add('hidden');
      const warningBanner = document.getElementById('warningBanner');
      if (warningBanner) {
        warningBanner.classList.remove('hidden');
        warningBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Hyper pulse on Yes button
      btnYes.classList.add('hyper-pulse');
      btnYes.style.transform = 'scale(1.22)';
    }, 900);

  }, 3000);
}

// ===== "YES" CELEBRATION =====
btnYes.addEventListener('click', () => {
  showSection('section-yes');

  // Date formatting in Vietnamese
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('theDate').textContent = today.toLocaleDateString('vi-VN', options);

  // Trigger Floral & Champagne Celebration Fireworks
  triggerFloralCelebration();

  for (let i = 0; i < 40; i++) {
    setTimeout(spawnStardust, i * 100);
  }
});

function triggerFloralCelebration() {
  const container = document.getElementById('floralCelebration');
  if (!container) return;
  const palette = ['#ffffff', '#f5df93', '#d4af37', '#edd69a', '#ffd700', '#fce4ec'];

  function createFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.6) + 100;
    const count = 32;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'blast-particle';

      const color = palette[Math.floor(Math.random() * palette.length)];
      const size = Math.random() * 9 + 4;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = color;
      p.style.boxShadow = `0 0 12px ${color}`;

      const angle = (i / count) * Math.PI * 2;
      const speed = Math.random() * 160 + 80;
      const tx = Math.cos(angle) * speed;
      const ty = Math.sin(angle) * speed;

      p.style.left = `${x}px`;
      p.style.top = `${y}px`;

      p.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1300 + Math.random() * 500,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'forwards'
      });

      container.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }
  }

  for (let i = 0; i < 6; i++) {
    setTimeout(createFirework, i * 350);
  }
  const timer = setInterval(createFirework, 1100);
  setTimeout(() => clearInterval(timer), 12000);
}

// ===== AMBIENT AUDIO =====
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

function playMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.35;
  bgMusic.play().then(() => {
    isPlaying = true;
    musicIcon.textContent = '🔊';
  }).catch(() => {
    isPlaying = false;
    musicIcon.textContent = '🔇';
  });
}

if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      musicIcon.textContent = '🔇';
    } else {
      playMusic();
    }
  });
}
