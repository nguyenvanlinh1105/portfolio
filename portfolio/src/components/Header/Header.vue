<template>
  <header class="topbar" role="banner">
    <div class="wrap">
      <!-- DESKTOP HEADER -->
      <div class="pill" v-if="!isMobile">
        <!-- LEFT: logo + nav -->
        <div class="left">
          <a class="brand" href="#" @click.prevent="$emit('navigate', 'home')" aria-label="Home">
            <img src="@/assets/images/profile.jpg" alt="Logo" class="brand__logo" />
            <span class="brand__name">MyStudio</span>
          </a>

          <nav class="nav" aria-label="Main">
            <a
              v-for="(item, idx) in navItems"
              :key="item.id"
              href="#"
              class="nav-link"
              :class="{ active: active === item.id }"
              @click.prevent="go(item)"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>

        <!-- CENTER: socials -->
        <div class="center">
          <div class="socials">
            <a class="social" href="#" aria-label="GitHub">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.6.7 2 .9.1-.7.4-1.2.7-1.5-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.6-2.8 5.6-5.4 5.9.4.3.7.9.7 1.8v2.6c0 .4.2.7.8.6A12 12 0 0 0 12 .5z"
                />
              </svg>
            </a>
            <a class="social" href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24">
                <path
                  d="M4.98 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-1 1.6-2 3.4-2 3.6 0 4.2 2.4 4.2 5.4V21H18v-5.1c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.4-2 2.7V21H9z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- RIGHT: CTA -->
        <div class="right">
          <button class="btn btn-primary" @click="$emit('Liên hệ ngay')">Liên hệ ngay</button>
        </div>
      </div>

      <!-- MOBILE HEADER -->
      <div class="mobile-header" v-else>
        <button class="hamburger" @click="openModal" aria-label="Open menu">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <a class="brand" href="#" @click.prevent="$emit('navigate', 'home')">
          <img src="@/assets/images/profile.jpg" alt="Logo" class="brand__logo" />
        </a>
      </div>
    </div>

    <!-- MOBILE MODAL -->
    <transition name="slide">
      <div
        v-if="mobileModal"
        class="mobile-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div class="modal-header">
          <div class="modal-left">
            <img src="@/assets/images/profile.jpg" alt="Logo" class="brand__logo" />
            <span class="modal-title">MyStudio</span>
          </div>
          <button class="close-btn" @click="closeModal" aria-label="Close menu">✕</button>
        </div>

        <nav class="modal-nav">
          <a
            v-for="(item, idx) in navItems"
            :key="item.id"
            href="#"
            class="modal-link"
            :class="{ active: active === item.id }"
            @click.prevent="go(item)"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="modal-footer">
          <a class="social small" href="#" aria-label="GitHub"
            ><img src="@/assets/images/GitHub.png" alt=""
          /></a>
          <a class="social small" href="#" aria-label="LinkedIn"
            ><img src="@/assets/images/Linkedin.png" alt=""
          /></a>
          <button class="btn btn-primary" @click="$emit('Liên hệ ngay')">Liên hệ ngay</button>
        </div>
      </div>
    </transition>

    <!-- OVERLAY -->
    <div v-if="mobileModal" class="overlay" @click="closeModal" aria-hidden="true"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['Liên hệ ngay', 'navigate'])

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]
const active = ref('projects')

// Responsive check
const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.matchMedia('(max-width: 780px)').matches
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  gsap.from('.topbar', {
    opacity: 0,
    y: -50,
    duration: 1.2,
    ease: 'power2.out',
  })
})
onBeforeUnmount(() => window.removeEventListener('resize', checkMobile))

// Modal control
const mobileModal = ref(false)
function openModal() {
  mobileModal.value = true
}
function closeModal() {
  mobileModal.value = false
}

// Lock scroll when modal is open
watch(mobileModal, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    const btn = document.querySelector('.mobile-modal .close-btn')
    if (btn) btn.focus()
  } else {
    document.body.style.overflow = ''
  }
})

// Nav
function go(item) {
  active.value = item.id
  emit('navigate', item.id)
  closeModal()
}
</script>

<style scoped>
:root {
  --bg: rgba(250, 252, 255, 0.6);
  --accent: #06b6d4;
  --accent-2: #7c3aed;
  --muted: #6b7280;
  --text: #0f1724;
  --pill-radius: 18px;
  --glass: 12px;
}

.topbar {
  position: sticky;
  top: 12px;
  z-index: 1100;
  padding: 12px 0;
}

.wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0, 5px;
}

/* PILL DESKTOP */
.pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 20px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(211, 244, 249, 0.72), rgba(230, 240, 255, 0.6));
  box-shadow:
    0 10px 40px rgba(162, 225, 238, 0.32),
    inset 0 1px 0 rgba(196, 194, 194, 0.2);
  backdrop-filter: blur(var(--glass));
  border: 1px solid rgba(255, 255, 255, 0.6);
  min-height: 72px;
  transition: transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
}
.pill:hover {
  transform: translateY(-8px);
}

/* Brand */
.left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--text);
  border-radius: 12px;
  padding: 8px 12px;
  transition:
    backdrop-filter 0.4s ease,
    box-shadow 0.4s ease,
    background-color 0.4s ease;
}

.brand__logo {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
  transition: transform 420ms;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
  border: 3px solid #34e3e9;
}

.brand:hover {
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.1); /* nền kính mờ nhẹ */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.brand:hover .brand__logo {
  transform: rotate(8deg) scale(1.03);
}

.brand:hover .brand__name {
  font-weight: 700;
}

/* Nav */
.nav {
  display: flex;
  gap: 12px;
  align-items: center;
}
.nav-link {
  position: relative;
  font-size: 16px;
  padding: 8px 10px;
  color: var(--muted);
  text-decoration: none;
  transition: all 0.25s;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -6px;
  height: 3px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transform: scaleX(0);
  transition: transform 300ms;
  opacity: 0;
}
.nav-link:hover {
  color: var(--text);
  transform: translateY(-3px);
  border-radius: 5px;
}
.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
  opacity: 1;
}
.nav-link.active {
  color: var(--text);
  font-weight: 700;
}

/* Social */
.center {
  flex: 1;
  display: flex;
  justify-content: center;
}
.socials {
  display: flex;
  gap: 10px;
}
.social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6));
  color: var(--muted);
  transition:
    transform 220ms,
    color 220ms;
}
.social:hover {
  transform: translateY(-4px);
  color: var(--accent);
  background: linear-gradient(180deg, rgba(100, 234, 255, 0.8), rgba(255, 255, 255, 0.6));
  box-shadow:
    0 10px 40px rgba(162, 225, 238, 0.6),
    inset 0 1px 0 rgba(196, 194, 194, 0.2);
  backdrop-filter: blur(var(--glass));
}
.social svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* CTA */
.right {
  display: flex;
  gap: 12px;
  align-items: center;
}
.btn {
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
}
.btn-ghost {
  background: transparent;
  color: var(--accent);
  border: 1px solid rgba(6, 182, 212, 0.14);
}
.btn-primary {
  background-color: rgba(21, 99, 255, 0.6);
  color: #fff;
  backdrop-filter: blur(var(--glass));
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.btn-primary:hover {
  background-color: rgb(255, 174, 28);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 174, 28, 0.4);
}

/* MOBILE HEADER */
.mobile-header {
  position: sticky;
  top: 0; /* thêm để sticky hoạt động */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px; /* tăng padding cho cảm giác “thoáng” hơn */
  margin: 6px 0;
  border-radius: 16px; /* bo tròn mềm mại hơn */
  background: linear-gradient(180deg, rgba(211,244,249,0.72), rgba(230,240,255,0.6));
  box-shadow: 0 10px 40px rgba(162,225,238,0.32), inset 0 1px 0 rgba(196,194,194,0.2);
  backdrop-filter: blur(10px); /* trực tiếp nếu chưa dùng biến --glass */
  z-index: 1000; /* để header luôn trên các phần tử khác */
}

.hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
}

/* MODAL */
.mobile-modal {
  position: fixed;
  top: calc(12px + 20px);
  /* left: 12px; */
  width: clamp(280px, 84%, 360px);
  max-height: 72vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(250, 250, 255, 0.92));
  backdrop-filter: blur(8px);
  box-shadow: 12px 18px 60px rgba(2, 6, 23, 0.18);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2000;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-left {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
  border-radius: 12px;
  padding: 8px 12px;
  transition: all 0.2s ease;
}

.modal-left:hover {
  transform: translateY(-3px);
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.1); /* nền kính mờ nhẹ */
  box-shadow: 0 8px 24px rgba(79, 220, 255, 0.3);
}

.modal-title {
  font-weight: 800;
  font-size: 18px;
  color: var(--text);
}
.close-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  transform: translateY(-3px);
  background-color: rgb(204, 254, 243);
  box-shadow:
    0 10px 40px rgba(41, 219, 255, 0.6),
    inset 0 1px 0 rgba(196, 194, 194, 0.2);
  backdrop-filter: blur(var(--glass));
}

.modal-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.modal-link {
  padding: 12px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text);
  font-weight: 700;
}
.modal-link:hover {
  background: linear-gradient(90deg, rgba(6, 182, 212, 0.06), rgba(124, 58, 237, 0.04));
  transform: translateX(6px);
}
.modal-actions {
  margin-top: auto;
  display: flex;
  gap: 10px;
}
.modal-footer {
  display: flex;
  gap: 10px;
}
.social.small {
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(6, 182, 212, 0.06);
  color: var(--accent);
}

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.01);
  border-radius: 10px;
  backdrop-filter: blur(3px);
  z-index: 1900;
}

/* SLIDE ANIMATION */
.slide-enter-from {
  transform: translateX(-120%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-enter-active {
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.3, 1);
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-120%);
  opacity: 0;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
