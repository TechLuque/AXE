<script setup>
import { ref, nextTick } from 'vue'
import 'dialog-polyfill/dist/dialog-polyfill.css'
import 'dialog-polyfill/dist/dialog-polyfill.js'

import Header from '../components/header/Header.vue'
import Modal from '../components/modal/Modal.vue'

const modalRef = ref(null)
const modalVideo = ref(null)
const showVideoModal = ref(false)

const openModal = () => {
  if (modalRef.value) modalRef.value.openModal()
}

const openVideoModal = async () => {
  showVideoModal.value = true
  await nextTick()

  const video = modalVideo.value
  if (!video) return

  const tryPlay = () => {
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        console.warn('No se pudo reproducir el video en Safari:', e)
      })
    }
  }

  // Si ya está listo
  if (video.readyState >= 3) {
    tryPlay()
  } else {
    // Esperar a que pueda reproducirse
    video.addEventListener('canplay', tryPlay, { once: true })
  }
}



const closeVideoModal = () => {
  showVideoModal.value = false
  if (modalVideo.value) {
    modalVideo.value.pause()
    modalVideo.value.currentTime = 0
  }
}
</script>


<template>
  <transition name="fade">
    <div v-if="showVideoModal" class="video-modal">
      <button class="close-video" @click="closeVideoModal">✕</button>
        <div class="full-video">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/V7t8VctWcMU?si=7erraDe9sqOFW-bt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
  </transition>

  <div>
    <Header />
    <Modal ref="modalRef" />
    <!-- HERO -->
    <div class="hero">
      <div class="overlay">
        <!-- IZQUIERDA -->
        <div class="left-column">
          <div class="logo-wrapper">
            <img src="/images/LOGO AXE B.png" alt="Logo Axelerate" class="logo-top" />
          </div>

          <div class="content-wrapper">
            <h1 class="title-main"></h1>
            <div class="buttons">
              <button @click="openModal" class="btn-ingresar">
                <span class="text">INGRESAR</span>
                <span class="shimmer"></span>
              </button>
              <button class="btn-entrada">
                <span class="text">
                  <a href="https://www.luqueacademy.com/offers/aFSdbcVE/checkout">ADQUIERE TU ENTRADA</a>
                </span>
                <span class="shimmer"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- DERECHA -->
        <div class="right-column">
          <div class="next-event">
            <p class="next-event-label"><span style="color:#FF2850">●</span> AXELERATE</p>
            <div class="event-card">
              
              <video
                class="full-video"
                autoplay
                muted
                playsinline
                loop
                preload="auto"
              >
               <source src="/images/BUCKLE_EDD.mp4" type="video/mp4">
              </video>
              <button class="btn-comprar" @click="openVideoModal">VER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

