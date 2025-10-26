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
          <div class="scrollbar-glass">Detail</div>
          <img :src="card.img" alt="Project Item" />
          <p class="title">{{ card.title }}</p>
        </div>

        <hr class="divider" />
        <div class="content-bottom">
          <p class="description">{{ card.desc }}</p>
          <p class="subdesc">{{ card.subdesc }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})
</script>
<style>
:root {
  --electric-border-color: #fff;
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

/* Card container - Sophisticated Blue */
.card-container {
  padding: 2px;
  border-radius: 24px;
  position: relative;
  color: #fff;
  width: 100%;
  background:
    linear-gradient(135deg, #0c4a6e, #1e3a8a, #3730a3), linear-gradient(to bottom, #0f172a, #1e293b);
  transition:
    background 0.6s ease,
    color 0.4s ease;
}

.card-container:hover {
  cursor: pointer;
  color: black;
  /* background:
    linear-gradient(135deg, #e5f7fd, #d4f1fd, #c3eafb), linear-gradient(to bottom, #e5f7fd, #d4f1fd); */
      background:
    linear-gradient(-30deg, #00c4ff, transparent 50%, #00e0ef),
    linear-gradient(to bottom, #d6f5ff, #ffffff);
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
  aspect-ratio: 3 / 4.5; /* THÊM MỚI: Giữ tỷ lệ khung hình 300/500 */
  height: auto; /* THAY ĐỔI: Bỏ chiều cao cố định */

  border-radius: 24px;
  border: 2px solid var(--electric-border-color);
  margin-top: -4px;
  margin-left: -4px;
  filter: url(#turbulent-displace);
}

.subdesc {
  display: none;
}
/* Tablet  */
@media (max-width: 1180px) {
  .description {
    display: none;
  }
}

@media (max-width: 992px) {
  .description {
    display: block;
  }
  .subdesc {
    display: none;
  }
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

  .content-container {
    padding: 10;
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
  padding: 20px; /* THAY ĐỔI: Giảm padding để phù hợp hơn với nhiều kích thước */
}

/* Content sections */
.content-top {
  display: flex;
  flex-direction: column;
  padding: 0; /* THAY ĐỔI: Bỏ padding ở đây vì đã có ở container */
  /* height: 100%; */
}

.content-top img {
  margin-top: 10px;
  border-radius: 8px;
  width: 100%;
  max-height: 160px;
  object-fit: fill;
  background-repeat: no-repeat; /* không lặp lại */
  background-position: center; /* canh giữa */
  background-size: cover;
}

.content-top .title {
  font-size: 18px;
  line-height: 20px;
  margin-top: 10px;
}
.content-bottom {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  padding: 0; /* THAY ĐỔI: Bỏ padding ở đây vì đã có ở container */
}

/* Scrollbar glass component */
.scrollbar-glass {
  background:
    radial-gradient(
      47.2% 50% at 50.39% 88.37%,
      rgba(75, 37, 200, 0.42) 0%,
      rgba(38, 193, 100, 0.3) 100%
    ),
    rgba(255, 255, 255, 0.04);
  position: relative;
  transition: background 0.3s ease;
  border-radius: 14px;
  width: fit-content;
  height: fit-content;
  padding: 6px 16px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.scrollbar-glass:hover {
  cursor: pointer;
  background:
    radial-gradient(
      47.2% 50% at 50.39% 88.37%,
      rgba(219, 223, 137, 0.52) 0%,
      rgba(71, 127, 216, 0.3) 100%
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

.description,
.subdesc {
  opacity: 0.5;
  font-size: clamp(14px, 3vw, 16px); /* THÊM MỚI: Font chữ co dãn */
}

/* Divider */
.divider {
  margin-top: 5px;
  border: none;
  height: 1px;
  background-color: currentColor;
  opacity: 0.1;
  mask-image: linear-gradient(to right, transparent, rgb(162, 227, 244), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
}
</style>
