<script setup>
import { ref } from 'vue'

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyNubbJFPkUej0Dk0HhzP9qtOLx_yKS5jhfENql4rGmwdUXXM_FzcOXO9BdrV1JYYqk/exec'

const handleFooterClick = () => {
  try {
    const correo = localStorage.getItem('correo') || ''
    if (!correo) return

    const body = new URLSearchParams({ op: 'mark_footer', email: correo }).toString()

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
  <section class="footer-hero">
    <div class="footer-content">
    <img src="/images/LOGO LUQUE B.png" alt="Logo" class="footer-logo">
      <p class="footer-text">©2026 Álvaro Luque</p>

        <a href="/REGLAS AXE MAR26.pdf" target="_blank">

          <span class="footer-text" >Reglamento Axelerate</span>
        </a>
<br>
      </div>
  </section>
</template>

<style scoped src="./footer.css" />
