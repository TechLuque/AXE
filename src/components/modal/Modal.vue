<template>
  <dialog id="launchModal" ref="modal">
    <button class="close-btn" @click="closeModal" aria-label="Cerrar modal">×</button>
    <h2>¡Bienvenido a Axelerate!</h2>
    <p>
      Ingresa tu correo para acceder al LOBBY y disfrutar toda la experiencia de Axelerate™ Virtual.
      (Usa el MISMO correo con el que compraste tu ticket)
    </p>
    <form class="modal-form">
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Correo electrónico"
        required
        class="modal-input"
      />
      <p id="msg" style="color: rgb(255, 55, 55); font-weight: 900;">
        <span class="cargando" v-if="cargando">Cargando . . .</span>
        <span v-else>{{ msg }}</span>
      </p>
      <div class="modal-actions">
        <button type="button" @click="closeModal">
          
          <a class="soporte" href="https://us02web.zoom.us/j/8656713692?omn=82849114527">SOPORTE</a>

          <!--- <a class="soporte" href="https://wa.me/573176484451?text=Hola%20tengo%20problemas%20para%20ingresar%20a%20la%20experiencia%20de%20Axelerate">SOPORTE</a> -->
        </button>
        <button type="button" :disabled="cargando" @click="login">
          <span v-if="cargando">INGRESAR</span>
          <span v-else>INGRESAR</span>
        </button>
      </div>
      <p>
        Al ingresar al lobby, autorizo a Luque Academy y sus representantes a capturar y utilizar mi imagen
        y voz en fotografías y grabaciones de video con fines promocionales y comerciales.
      </p>
    </form>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const msg = ref('')
const cargando = ref(false)
const modal = ref(null)

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyNubbJFPkUej0Dk0HhzP9qtOLx_yKS5jhfENql4rGmwdUXXM_FzcOXO9BdrV1JYYqk/exec'

// --- Precarga segura: hashes cacheados de emails ---
const PRELOAD_TTL_MS = 5 * 60 * 1000         // 5 minutos
let emailHashes = new Set()                  // no reactivo; sólo para verificación rápida

async function sha256Hex (str) {
  try {
    const buf = new TextEncoder().encode(str)
    const digest = await crypto.subtle.digest('SHA-256', buf)
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return '' // si el navegador no soporta crypto.subtle, seguimos sin validación local
  }
}

async function preloadEmails () {
  try {
    // Usa cache en localStorage si sigue fresco
    const cacheRaw = localStorage.getItem('email_hashes_cache')
    if (cacheRaw) {
      const cache = JSON.parse(cacheRaw)
      const fresh = cache && (Date.now() - cache.ts < PRELOAD_TTL_MS) && Array.isArray(cache.hashes)
      if (fresh) {
        emailHashes = new Set(cache.hashes)
        return
      }
    }

    // Pide al Apps Script la lista cacheada de hashes (no expone emails)
    const res = await fetch(`${SHEET_API_URL}?op=preload`, { method: 'GET', cache: 'no-store' })
    const json = await res.json().catch(() => ({}))
    if (json.ok && Array.isArray(json.hashes)) {
      emailHashes = new Set(json.hashes)
      localStorage.setItem('email_hashes_cache', JSON.stringify({ ts: Date.now(), hashes: json.hashes }))
    }
  } catch (e) {
    console.warn('Preload falló:', e)
  }
}

onMounted(() => {
  if (modal.value && typeof modal.value.showModal !== 'function' && typeof dialogPolyfill !== 'undefined') {
    dialogPolyfill.registerDialog(modal.value)
  }
  // Calienta el WebApp y prepara verificación local instantánea
  preloadEmails()
})

const openModal = () => {
  msg.value = ''
  email.value = ''
  cargando.value = false
  modal.value?.showModal()
}

const closeModal = () => {
  modal.value?.close()
}

const login = async () => {
  const trimmed = email.value.trim().toLowerCase()
  msg.value = ''
  cargando.value = true

  if (!trimmed || !trimmed.includes('@')) {
    msg.value = 'Ingresa un correo válido o comunícate con Soporte'
    cargando.value = false
    return
  }

  // Validación local súper rápida (solo UX; el POST siempre decide)
  try {
    const h = await sha256Hex(trimmed)
    if (emailHashes.size && !emailHashes.has(h)) {
      // El cache puede estar viejo; igual haremos POST autoritativo
      msg.value = 'Verificando correo…'
    }
  } catch {}

  try {
    const res = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email: trimmed })
    })

    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      console.error('POST no-OK:', res.status, txt)
      throw new Error('Respuesta no válida del servidor')
    }

    const json = await res.json().catch(() => ({}))

    if (json.ok) {
      if (json.join_url) localStorage.setItem('join_url', json.join_url)
      localStorage.setItem('sesionIniciada', 'true')
      localStorage.setItem('correo', trimmed)
      closeModal()
      router.push('/Preview')
    } else {
      msg.value = 'Ingresa un correo válido o comunícate con Soporte'
      console.warn('POST error:', json.error)
    }
  } catch (err) {
    console.error(err)
    msg.value = 'No se pudo validar el correo. Intenta más tarde.'
  } finally {
    cargando.value = false
  }
}

defineExpose({ openModal })
</script>


<style scoped src="./modal.css" />
