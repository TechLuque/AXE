<template>
  <main id="app">
    <div class="ticket-wrapper">
      <div ref="ticket" class="ticket">
        <div class="front">
          <p class="name">{{ nombre }}</p>
        </div>
        <div class="back"></div>
      </div>
      </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const nombre = defineModel('nombre')
const ticket = ref(null)

const animarTicket = () => {
  const duracion = 6
  const app = document.querySelector('#app')

  const tlRotacion = gsap.to(app, {
    '--r': '-440deg',
    duration: duracion,
    ease: 'none',
    repeat: -1,
    modifiers: {
      '--r': gsap.utils.unitize(v => parseFloat(v) % 440)
    }
  })

  const brillo = gsap.to(app, {
    '--p': '0%',
    duration: duracion / 2,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true
  })

  const intensidad = gsap.to(app, {
    '--o': 1,
    duration: duracion / 4,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true
  })

  const holo = gsap.to(app, {
    '--h': '100%',
    duration: duracion / 4,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  })

  ticket.value.addEventListener('mouseenter', () => {
    tlRotacion.pause()
    brillo.pause()
    intensidad.pause()
    holo.pause()
  })

  ticket.value.addEventListener('mouseleave', () => {
    tlRotacion.play()
    brillo.play()
    intensidad.play()
    holo.play()
  })
}

onMounted(() => {
  animarTicket()
})
</script>

<style scoped src="./ticket.css"/>
