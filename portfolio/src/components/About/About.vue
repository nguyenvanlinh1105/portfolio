<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="about-image">
        <img src="@/assets/images/aboutme.png" alt="Your Name" />
      </div>
      <div class="about-content">
        <h2>About Me</h2>
        <h3>
          Hello everyone. I'm a
          <span class="typing-effect">{{ typedText }}</span>
          <span class="cursor" :class="{ typing: isTyping }">&nbsp;</span>
        </h3>
        <p>
          Xin chào! Tôi là một nhà phát triển full-stack đam mê xây dựng các ứng dụng web đẹp, thân
          thiện với người dùng và có hiệu suất cao. Với nền tảng về Java cho backend và React/Vue.js
          cho frontend, tôi luôn tìm kiếm cơ hội để học hỏi và áp dụng các công nghệ mới vào công
          việc.
        </p>
        <p>
          Mục tiêu của tôi là tạo ra những sản phẩm không chỉ giải quyết vấn đề mà còn mang lại trải
          nghiệm tuyệt vời cho người dùng.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// --- Cấu hình cho hiệu ứng chữ chạy ---
const words = ref(['Nguyễn Văn Linh'])
const typedText = ref('')
const isTyping = ref(true)

let wordIndex = 0
let charIndex = 0
let isDeleting = false
const typingSpeed = 150 // Tốc độ gõ
const deletingSpeed = 100 // Tốc độ xóa
const delayBetweenWords = 2000 // Thời gian chờ trước khi gõ từ mới

const type = () => {
  const currentWord = words.value[wordIndex]

  if (isDeleting) {
    // Xóa chữ
    typedText.value = currentWord.substring(0, charIndex - 1)
    charIndex--
  } else {
    // Gõ chữ
    typedText.value = currentWord.substring(0, charIndex + 1)
    charIndex++
  }

  // Chuyển đổi giữa gõ và xóa
  if (!isDeleting && charIndex === currentWord.length) {
    // Gõ xong 1 từ -> chờ rồi bắt đầu xóa
    isTyping.value = false
    setTimeout(() => {
      isDeleting = true
      isTyping.value = true
    }, delayBetweenWords)
  } else if (isDeleting && charIndex === 0) {
    // Xóa xong 1 từ -> chuyển sang từ tiếp theo
    isDeleting = false
    wordIndex = (wordIndex + 1) % words.value.length
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed
  setTimeout(type, speed)
}

onMounted(() => {
  setTimeout(type, typingSpeed)
})
</script>

<style scoped>
.about-section {
  /* Màu nền gradient bạn yêu cầu */
  background:
    linear-gradient(-30deg, #dafbff, transparent, #e6fdff), linear-gradient(to bottom, #fff, #fff);
  backdrop-filter: blur(12px);
  box-shadow:
  0 4px 10px rgba(186, 240, 255, 0.5),
  0 8px 20px rgba(162, 225, 238, 0.4),
  inset 0 1px 2px rgba(255, 255, 255, 0.6);
  padding: 50px 20px;
  min-height: 100vh;
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px); /* Hiệu ứng blur */
  border-radius: 5px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.about-image {
  flex: 1;
  max-width: 350px;
}

.about-image img {
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.about-content {
  flex: 1.5;
  color: #333;
}

.about-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a2c4e;
  font-family: 'Playwrite DE SAS';
}

.about-content h3 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #2c3e50;
  height: 2.2rem; /* Đặt chiều cao cố định để không bị giật khi chữ thay đổi */
  font-family: 'Playwrite DE SAS';
}

/* Hiệu ứng chữ chạy */
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

.about-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 20px;
}
/* --- Responsive cho Tablet và Mobile --- */

/* Tablet */
@media (max-width: 992px) {
  .about-section {
    padding: 30px 20px;
    min-height: 0;
  }
  .container {
    flex-direction: column;
    text-align: center;
    gap: 0;
    padding: 10px;
  }

  .about-content h3 {
    margin-bottom: 40px;
  }

  .about-image {
    max-width: 300px;
    margin-bottom: 30px;
  }

  .about-image img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border-color: #e6fdff;
    box-shadow:
  0 4px 10px rgba(255, 186, 238, 0.5),
  0 8px 30px rgba(229, 144, 211, 0.4),
  inset 0 1px 2px rgba(255, 255, 255, 0.6);
    
  }
}

/* Mobile */
@media (max-width: 576px) {
  .about-section {
    padding: 15px 15px;
    align-items: none;
    margin-top: 20px; 
  }

  .container {
    padding: 20px;
  }

  .about-content h2 {
    font-size: 2rem;
  }

  .about-content h3 {
    font-size: 1.2rem;
    height: 1.8rem;
  }

  .about-content p {
    font-size: 1rem;
  }
}
</style>
