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
              <img src="@/assets/images/GitHub.png" alt="" />
            </a>
            <a class="social" href="#" aria-label="LinkedIn">
              <img src="@/assets/images/Linkedin.png" alt="" />
            </a>
            <a class="social" href="#" aria-label="GitHub">
              <img src="@/assets/images/Gmail.png" alt="" />
            </a>
            <a class="social" href="#" aria-label="LinkedIn">
              <img src="@/assets/images/Facebook.png" alt="" />
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
import { useHeader } from './useHeader'
const emit = defineEmits(['Liên hệ ngay', 'navigate'])
const { navItems, active, isMobile, mobileModal, openModal, closeModal, go } = useHeader(emit)
</script>
<style src="./header.css"></style>

