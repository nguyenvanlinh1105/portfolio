<template>
  <main class="main-container">
    <svg class="svg-container">
      <defs>
        <filter
          id="turbulent-displace"
          colorInterpolationFilters="sRGB"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02"
            numOctaves="10"
            result="noise1"
            seed="1"
          />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
            <animate
              attributeName="dy"
              values="700; 0"
              dur="6s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </feOffset>

          <feTurbulence
            type="turbulence"
            baseFrequency="0.02"
            numOctaves="10"
            result="noise2"
            seed="1"
          />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
            <animate
              attributeName="dy"
              values="0; -700"
              dur="6s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </feOffset>

          <feTurbulence
            type="turbulence"
            baseFrequency="0.02"
            numOctaves="10"
            result="noise1"
            seed="2"
          />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
            <animate
              attributeName="dx"
              values="490; 0"
              dur="6s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </feOffset>

          <feTurbulence
            type="turbulence"
            baseFrequency="0.02"
            numOctaves="10"
            result="noise2"
            seed="2"
          />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
            <animate
              attributeName="dx"
              values="0; -490"
              dur="6s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </feOffset>

          <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
          <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
          <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="combinedNoise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>

    <div class="card-container">
      <div class="inner-container">
        <div class="border-outer">
          <div class="main-card"></div>
        </div>
        <div class="glow-layer-1"></div>
        <div class="glow-layer-2"></div>
      </div>

      <div class="overlay-1"></div>
      <div class="overlay-2"></div>
      <div class="background-glow"></div>

      <div class="content-container">
        <div class="content-top">
          <div class="scrollbar-glass">Animated</div>
          <p class="title">Electric Border</p>
        </div>

        <hr class="divider" />

        <div class="content-bottom">
          <p class="description">In case you'd like to emphasize something very dramatically.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// Không cần JS cho hiệu ứng này
</script>
<style>
:root {
  --electric-border-color: #6568dd;
  --electric-light-color: oklch(from var(--electric-border-color) l c h);
  --gradient-color: oklch(from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4);
  --color-neutral-900: oklch(0.185 0 0);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Main container */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; /* THÊM MỚI: Đảm bảo container co dãn */
}

/* SVG positioning */
.svg-container {
  position: absolute;
}

/* Card container */
.card-container {
  padding: 2px;
  border-radius: 24px;
  position: relative;
  width: 100%; /* THÊM MỚI: Cho phép co dãn */
  background:
    linear-gradient(-30deg, #82dde9, transparent, #c0e0e4), linear-gradient(to bottom, #6568dd);
}

/* Inner container */
.inner-container {
  position: relative;
}

/* Border layers */
.border-outer {
  border: 2px solid rgba(72, 87, 221, 0.5);
  border-radius: 24px;
  padding-right: 4px;
  padding-bottom: 4px;
}

.main-card {
  /* --- THAY ĐỔI QUAN TRỌNG CHO RESPONSIVE --- */
  width: 100%; /* THAY ĐỔI: Chuyển từ 300px sang 100% */
  aspect-ratio: 3 / 5; /* THÊM MỚI: Giữ tỷ lệ khung hình 300/500 */
  height: auto; /* THAY ĐỔI: Bỏ chiều cao cố định */

  border-radius: 24px;
  border: 2px solid var(--electric-border-color);
  margin-top: -4px;
  margin-left: -4px;
  filter: url(#turbulent-displace);
}

/* --- THÊM MỚI: TỐI ƯU HIỆU SUẤT TRÊN DI ĐỘNG --- */
@media (max-width: 768px) {
  .main-card {
    /* Tắt bộ lọc SVG tốn tài nguyên trên các thiết bị có màn hình nhỏ hơn 768px */
    filter: none !important;
  }

  .glow-layer-1,
  .glow-layer-2 {
    /* Cũng có thể giảm hoặc tắt hiệu ứng blur để nhẹ hơn */
    filter: blur(2px);
  }
}

/* Glow effects */
.glow-layer-1 {
  border: 2px solid rgba(221, 132, 72, 0.6);
  border-radius: 24px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(1px);
}

.glow-layer-2 {
  border: 2px solid var(--electric-light-color);
  border-radius: 24px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(4px);
}

/* Overlay effects */
.overlay-1 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  opacity: 1;
  mix-blend-mode: overlay;
  transform: scale(1.1);
  filter: blur(16px);
  background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
}

.overlay-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  opacity: 0.5;
  mix-blend-mode: overlay;
  transform: scale(1.1);
  filter: blur(16px);
  background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
}

/* Background glow */
.background-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  filter: blur(32px);
  transform: scale(1.1);
  opacity: 0.3;
  z-index: -1;
  background: linear-gradient(
    -30deg,
    var(--electric-light-color),
    transparent,
    var(--electric-border-color)
  );
}

/* Content container */
.content-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px; /* THAY ĐỔI: Giảm padding để phù hợp hơn với nhiều kích thước */
}

/* Content sections */
.content-top {
  display: flex;
  flex-direction: column;
  padding: 0; /* THAY ĐỔI: Bỏ padding ở đây vì đã có ở container */
  height: 100%;
}

.content-bottom {
  display: flex;
  flex-direction: column;
  padding: 0; /* THAY ĐỔI: Bỏ padding ở đây vì đã có ở container */
}

/* Scrollbar glass component */
.scrollbar-glass {
  background:
    radial-gradient(
      47.2% 50% at 50.39% 88.37%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.04);
  position: relative;
  transition: background 0.3s ease;
  border-radius: 14px;
  width: fit-content;
  height: fit-content;
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.scrollbar-glass:hover {
  background:
    radial-gradient(
      47.2% 50% at 50.39% 88.37%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.08);
}

.scrollbar-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1px;
  background: linear-gradient(
    150deg,
    rgba(255, 255, 255, 0.48) 16.73%,
    rgba(255, 255, 255, 0.08) 30.2%,
    rgba(255, 255, 255, 0.08) 68.2%,
    rgba(255, 255, 255, 0.6) 81.89%
  );
  border-radius: inherit;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  pointer-events: none;
}

/* Typography */
.title {
  font-size: clamp(24px, 5vw, 36px); /* THÊM MỚI: Font chữ co dãn */
  font-weight: 500;
  margin-top: auto;
}

.description {
  opacity: 0.5;
  font-size: clamp(14px, 3vw, 16px); /* THÊM MỚI: Font chữ co dãn */
}

/* Divider */
.divider {
  margin-top: auto;
  border: none;
  height: 1px;
  background-color: currentColor;
  opacity: 0.1;
  mask-image: linear-gradient(to right, transparent, rgb(162, 227, 244), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
}
</style>
