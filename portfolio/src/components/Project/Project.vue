<template>
  <section id="project" class="project-section">
    <div class="container">
      <header class="project-header">
        <h2 class="section-title">Dự án của mình</h2>
        <h3 class="section-subtitle">
          Dưới đây là một số dự án mình đã làm
          <span class="typing-effect">{{ typedText }}</span>
          <span class="cursor" :class="{ typing: isTyping }">&nbsp;</span>
        </h3>
      </header>

      <div class="project-grid">
        <div
        v-for="(item, index) in cards"
        :key="index"  
        class="project-item">
          <h4>{{ item.h1 }}</h4>
          <p>{{ item.subtitle }}</p>
          <ProjectItem :card="item" />
        </div>
        <!-- <div class="project-item">
          <h4>Quản lý Cà Phê</h4>
          <p>Hệ thống POS (Point of Sale) cho cửa hàng cà phê, bao gồm quản lý kho và đơn hàng.</p>
          <ProjectItem />
        </div>
        <div class="project-item">
          <h4>Website Cá Nhân</h4>
          <p>Portfolio cá nhân được xây dựng bằng Vue 3 và Vite.</p>
          <ProjectItem />
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectItem from '../Common/ProjectItem.vue'
// Lưu ý: ProjectItem component không được import vào đây để giữ cho mã đơn giản
// Nếu bạn sử dụng ProjectItem thực tế, hãy đảm bảo import lại nó.

// --- Cấu hình cho hiệu ứng chữ chạy (giữ nguyên) ---
const words = ref(['Pet shop', 'Quản lí bán cà phê', 'Portfolio cá nhân']) // Thêm từ mới
const typedText = ref('')
const isTyping = ref(true)

let wordIndex = 0
let charIndex = 0
let isDeleting = false
const typingSpeed = 150
const deletingSpeed = 100
const delayBetweenWords = 2000

const type = () => {
  const currentWord = words.value[wordIndex]

  if (isDeleting) {
    typedText.value = currentWord.substring(0, charIndex - 1)
    charIndex--
  } else {
    typedText.value = currentWord.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isTyping.value = false
    setTimeout(() => {
      isDeleting = true
      isTyping.value = true
    }, delayBetweenWords)
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    wordIndex = (wordIndex + 1) % words.value.length
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed
  setTimeout(type, speed)
}

onMounted(() => {
  setTimeout(type, typingSpeed)
})

const cards = [
  {
    h1:"🥗 FoodTrack",
    subtitle:"Ứng dụng bán đồ ăn và đồ uống trực tuyến",
    img: 'src/assets/images/foodtrack.png',
    title: '🥗🍜🍕🍔☕',
    desc: 'FoodTrack là một ứng dụng Android cho phép người dùng đặt món ăn, đồ uống nhanh chóng và tiện lợi.',
    subdesc:'FoodTrack ứng dụng quả li bán hàng tiện lợi✅'
  },
  {
    h1:"☕ CafeLink",
    subtitle:"Ứng dụng quản lý cửa hàng cà phê sử dụng XML và SQL Server",
    img: 'src/assets/images/linhhoadinh.png',
    title: '🧋🥤🍵🍹🍺🍷🍸🧃',
    desc: 'Ứng dụng được xây dựng nhằm giúp người quản lí dễ dàng theo dõi hoạt động kinh doanh hằng ngày, cho phép theo dõi danh mục thức uống, nhân viên, tạo và in hóa đơn nhanh chóng.'
  },
  {
    h1:"🐱 PetShop",
    subtitle:"Ứng dụng quản lý cửa hàng thú cưng và bán hàng trực tuyến.",
    img: 'src/assets/images/petshop.png',
    title: '🐶 🐱 🐰 🐹 🐦',
    desc: 'Hệ thống quản lý cửa hàng thú cưng, được phát triển hỗ trợ khách hàng và nhân viên dễ dàng quản lý các dịch vụ, thú cưng, đơn hàng, và thanh toán thông qua nền tảng web.',
    subdesc:'PetShop giải pháp quản lý cho phòng khám thú y nhỏ & vừa'
  }
]
</script>

<style scoped>
/* ==================================== */
/* CÁC THIẾT LẬP CHUNG VÀ NỀN (GIỮ NGUYÊN) */
/* ==================================== */
.project-section {
  /* background:
    linear-gradient(-30deg, #dafbff, transparent, #e6fdff), 
    linear-gradient(to bottom, #fff, #fff); */
  /* backdrop-filter: blur(12px); */
  /* box-shadow:
    0 4px 10px rgba(186, 240, 255, 0.5),
    0 8px 20px rgba(162, 225, 238, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.6); */
  padding: 20px 20px; /* Tăng padding để có không gian */
  min-height: 100vh;
  display: flex;
  /* margin-top: 30px; */
  align-items: flex-start; /* Thay đổi để nội dung dồn lên trên */
  justify-content: center;
  border-radius: 5px;
  transition: all 0.3s ease-in;
}

.project-section:hover {
  transform: translateY(-5px);
}

.container {
  max-width: 1200px; /* Tăng max-width để chứa 3 cột */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 40px;
  border-radius: 20px;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  /* backdrop-filter: blur(10px); */
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
}

/* ==================================== */
/* HEADER (THAY THẾ project-content) */
/* ==================================== */
.project-header {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a2c4e;
  font-family: 'Playwrite DE SAS', cursive;
}

.section-subtitle {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0;
  color: #2c3e50;
  height: 2.2rem;
  font-family: 'Playwrite DE SAS', cursive;
}

/* Hiệu ứng chữ chạy (giữ nguyên) */
.typing-effect {
  color: #3498db;
  font-weight: 600;
  border-right: 2px solid transparent;
}

.cursor {
  display: inline-block;
  background-color: #2c3e50;
  width: 3px;
  animation: blink 1s infinite;
}

.cursor.typing {
  animation: none;
}

@keyframes blink {
  0%,
  100% {
    background-color: transparent;
  }
  50% {
    background-color: #2c3e50;
  }
}

/* ==================================== */
/* CSS GRID CHO DANH SÁCH DỰ ÁN */
/* ==================================== */
.project-grid {
  display: grid;
  /* Mặc định trên Desktop: 3 cột đều nhau */
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 0;
}

.project-item {
  background-color: #f7f9fc;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-top: 5px solid #3498db; /* Điểm nhấn màu xanh */
  width: 100%;
}

.project-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 25px rgba(52, 152, 219, 0.3);
}

.project-item h4 {
  font-size: 1.5rem;
  color: #1a2c4e;
  margin-bottom: 8px;
  font-weight: 600;
}

.project-item p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

/* ==================================== */
/* RESPONSIVE DESIGN */
/* ==================================== */

@media (max-width: 1086px) {
  .project-item {
    padding: 15px
  }
  
}

/* Tablet (max-width: 992px) */
@media (max-width: 992px) {
  .section-title {
    font-size: 2.5rem;
  }
  .section-subtitle {
    font-size: 1.5rem;
    height: 2rem;
  }

  .project-grid {
    /* Tablet: Chuyển sang 2 cột */
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .project-item {
    padding: 15px;
  }
}

/* Mobile (max-width: 576px) */
@media (max-width: 576px) {
  .project-section {
    padding: 30px 15px;
  }
  .container {
    padding: 20px;
    gap: 30px;
  }

  .section-title {
    font-size: 2rem;
  }
  .section-subtitle {
    font-size: 1.2rem;
    height: 1.8rem;
  }

  .project-grid {
    /* Mobile: Chuyển sang 1 cột */
    grid-template-columns: 1fr;
    /* gap: 20px; */
  }
}
</style>
