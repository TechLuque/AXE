<script setup>
import { ref } from 'vue'

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyNubbJFPkUej0Dk0HhzP9qtOLx_yKS5jhfENql4rGmwdUXXM_FzcOXO9BdrV1JYYqk/exec'

const handleAsesorClick = () => {
  try {
    const correo = localStorage.getItem('correo') || ''
    if (!correo) return

    const body = new URLSearchParams({ op: 'mark_asesor', email: correo }).toString()

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

const handleDipticoClick = () => {
  try {
    const correo = localStorage.getItem('correo') || ''
    if (!correo) return

    const body = new URLSearchParams({ op: 'mark_diptico', email: correo }).toString()

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
</script>

<template>
  <section class="asesor-hero">
    <div class="hero-content asesor-section">
      <div class="left">
        <h1 class="main-title">Asesoría y Consultoría.</h1>
        <p>Acceso a expertos en negocios, marketing y finanzas para impulsar tu empresa.</p>

        <div class="button-group">

          <a
            href="https://us02web.zoom.us/j/8656713692?omn=82849114527"
            class="hero-btn"
            @click="handleAsesorClick"
          >
            Contáctanos
          </a>

   <!-- comentario -->
          <a
            href="https://cliczy.com/separacion-msta"
            class="hero-btn lbs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maestría Del Dinero
          </a>

        </div>
      </div>

      <div class="right">
        <img src="/images/ZOOM ASESOR.png" alt="Asesores" class="section-image asesor-image" />
      </div>
    </div>

   <!-- comentario -->
    <div class="hero-content diptico-section">
      <div class="left">
        <h1 class="main-title">Guía de Maestría del Dinero</h1>
        <p>Si quieres entender Maestría del Dinero® en pocos minutos, empieza por este documento.</p>

        <div class="button-group">

          <a
            href="https://assets.cdn.filesafe.space/vNTl04SMXRMV7I4CYfsP/media/69b489d0eba487331d332fe5.pdf"
            class="hero-btn"
            target="_blank"
            rel="noopener noreferrer"
            @click="handleDipticoClick"
          >
            Descargar
          </a>

   <!-- comentario -->
          <a
            href="https://cliczy.com/separacion-msta"
            class="hero-btn lbs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maestría Del Dinero
          </a>

        </div>
      </div>

      
      <div class="right">
        <img src="/images/Diptico Mockup.png" alt="Díptico Mockup" class="section-image diptico-image" />
      </div>
    </div>
  </section>
</template>

<style scoped src="./asesor.css" />
