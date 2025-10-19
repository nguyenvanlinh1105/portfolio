// src/composables/useHeader.js
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import gsap from 'gsap'

export function useHeader(emit) {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ]
  const active = ref('projects')

  // Responsive
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

  // Modal
  const mobileModal = ref(false)
  function openModal() {
    mobileModal.value = true
  }
  function closeModal() {
    mobileModal.value = false
  }

  // Scroll lock
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

  return {
    navItems,
    active,
    isMobile,
    mobileModal,
    openModal,
    closeModal,
    go,
  }
}
