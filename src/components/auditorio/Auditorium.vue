<script setup>
import { ref, nextTick } from 'vue'


const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyNubbJFPkUej0Dk0HhzP9qtOLx_yKS5jhfENql4rGmwdUXXM_FzcOXO9BdrV1JYYqk/exec'

const joinUrl = ref(localStorage.getItem('join_url') || '')
const showVideoModal = ref(false)
const showLbsModal = ref(false)

const handleJoinClick = (e) => {
  if (!joinUrl.value) {
    e.preventDefault()
    alert('Inicia sesión para obtener tu enlace de acceso.')
    return
  }

  try {
    const correo = localStorage.getItem('correo') || ''
    if (!correo) return

    const body = new URLSearchParams({ op: 'mark_auditorio', email: correo }).toString()

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/x-www-form-urlencoded;charset=UTF-8' })
      navigator.sendBeacon(SHEET_API_URL, blob)
    } else {
      fetch(SHEET_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        keepalive: true
      }).catch(() => {})
    }
  } catch (_) {}
}


const openVideoModal = async () => {
  showVideoModal.value = true
}

const closeVideoModal = () => {
  showVideoModal.value = false
}

const openLbsModal = () => {
  showLbsModal.value = true
}

const closeLbsModal = () => {
  showLbsModal.value = false
}
</script>

<template>
  <section class="auditorio-hero">
    <div class="hero-content">
      <div class="left">
        <h1 class="main-title">Acelera las ventas, rentabilidad y productividad de tu empresa.</h1>
        <div class="button-group">

          <a
            :href="joinUrl || undefined"
            class="hero-btn"
            target="_blank"
            rel="noopener"
            :aria-disabled="!joinUrl"
            :class="{ disabled: !joinUrl }"
            @click="handleJoinClick"
          >
            Ingresar Al Auditorio
          </a>

             <!-- comentario -->
<!--   -->
          <a
            href="https://www.alvaroluque.com/mentoria-axelerate"
            class="hero-btn lbs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mentoría Axelerate
          </a>


   <!-- comentario -->
<!--
          <a
            href="https://cliczy.com/separacion-msta"
            class="hero-btn lbs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maestría Del Dinero
          </a>
-->
   <!-- comentario -->

<!--  
          <a
            href="#"
            class="hero-btn lbs"
            @click.prevent="openLbsModal"
          >
            Luque Business Summit 2026
          </a>

-->

        </div>
        
      </div>

      <div class="right">
        <div class="event-box">
          <p class="next-event-label"><span style="color:#FF2850">●</span> PRÓXIMO EVENTO</p>
          <div class="video-wrapper">
            <video 
              class="event-video" 
              autoplay 
              muted 
              playsinline 
              loop 
              preload="metadata">
              <source src="/images/Loop_LBS.mp4" type="video/mp4" />
            </video>
            <div class="overlay-text">
              <img src="/images/LOGO LBS.png" alt="LUQUE BUSINESS SUMMIT" class="overlay-title-image" />
            </div>
            <div class="watch-button" @click="openVideoModal">VER</div>
          </div>
        </div>
      </div>
    </div>
  </section>

<teleport to="body">
  <div v-if="showVideoModal" class="modal-wrapper">
    <transition name="fade">
      <div class="video-modal">
        <button class="close-video" @click="closeVideoModal">✕</button>
        <div class="full-video">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lSYcfGlNUZI?si=D0PW3ooTqt4UcwSV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </transition>
  </div>

  <div v-if="showLbsModal" class="modal-wrapper">
    <transition name="fade">
      <div class="lbs-modal">
        <button class="close-btn" @click="closeLbsModal">✕</button>
        <h2>Selecciona cantidad de entradas</h2>
        <div class="entries-buttons">
          <a href="https://cliczy.com/luque-business-summit-2026" class="entry-btn">
            $245 USD
            <span class="entry-price">1 Entrada </span>
          </a>
          <a href="https://cliczy.com/LBS-2Entradas" class="entry-btn">
            $445 USD
            <span class="entry-price">2 Entrada</span>
          </a>
          <a href="https://cliczy.com/LBS-3Entradas" class="entry-btn">
            $585 USD
            <span class="entry-price">3 Entrada</span>
          </a>
        </div>
        <div class="modal-footer">
          <img src="/images/LOGO LUQUE B.png" alt="Logo Luque" class="modal-logo" />
        </div>
      </div>
    </transition>
  </div>
</teleport>

</template>

<style scoped>
.hero-btn.disabled {
  pointer-events: none;
  opacity: .6;
  cursor: not-allowed;
}

.lbs-modal {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease;
  text-align: center;
  max-height: 80vh;
  overflow-y: auto;
}

.lbs-modal h2 {
  text-align: center;
  color: #ffffff;
  margin: 0 0 2rem 0;
  font-size: 1.8rem;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
  color: #999;
}

.entries-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.entry-btn {
  padding: 0.8rem 1.2rem;
  background-color: #FF2850;
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s ease;
  display: inline-block;
  flex-direction: column;
}

.entry-price {
  display: block;
  font-size: 0.75rem;
  font-weight: normal;
  margin-top: 0.25rem;
  opacity: 0.9;
}

.entry-btn:hover {
  background-color: #e01f40;
}

.modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.modal-logo {
  height: 50px;
  object-fit: contain;
}

@keyframes slideIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .lbs-modal {
    padding: 2rem;
    max-width: 90vw;
    width: 100%;
  }

  .lbs-modal h2 {
    font-size: 1.4rem;
    margin: 0 0 1.5rem 0;
  }

  .entries-buttons {
    flex-direction: column;
    gap: 0.8rem;
  }

  .entry-btn {
    width: 100%;
    padding: 1rem;
  }

  .entry-price {
    margin-top: 0.5rem;
  }

  .modal-footer {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }

  .modal-logo {
    height: 40px;
  }

  .close-btn {
    font-size: 1.2rem;
  }
}
</style>
<style scoped src="./auditorio.css" />
