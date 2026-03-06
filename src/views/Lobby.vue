<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Navbar from '../components/navbar/Navbar.vue'
import Auditorium from '../components/auditorio/Auditorium.vue'
import Asesor from '../components/asesor/Asesor.vue'
import Carrusel from '../components/carrusel/Carrusel.vue'
import Schedule from '../components/cronograma/Schedule.vue'
import Footer from '../components/footer/Footer.vue'

const accesoAutorizado = ref(false)
const router = useRouter()

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyNubbJFPkUej0Dk0HhzP9qtOLx_yKS5jhfENql4rGmwdUXXM_FzcOXO9BdrV1JYYqk/exec'

const verificarAcceso = async () => {
  // Verificar si ya viene autenticado desde Preview
  if (history.state?.yaAutenticado) {
    accesoAutorizado.value = true
    return
  }

  const correo = localStorage.getItem('correo')
  if (!correo) return router.push('/')

  try {
    const res = await fetch(SHEET_API_URL)
    const data = await res.json()

    const user = data.email.find(entry =>
      entry.email.trim().toLowerCase() === correo.trim().toLowerCase()
    )

    if (user) {
      accesoAutorizado.value = true
    } else {
      router.push('/')
    }
  } catch (err) {
    console.error('Error de autenticación:', err)
    router.push('/')
  }
}


const lobbyListo = ref(false)

onMounted(() => {
  verificarAcceso()

  window.addEventListener('load', () => {
    lobbyListo.value = true
  })

  document.body.style.overflowY = 'auto'
  document.body.style.overflowX = 'hidden'
})


const whatsappLink = 'https://us02web.zoom.us/j/87632757638?pwd=TpWrHgLaKTy5ruLP9rvwqf6AjaDs6P.1'
</script>

<template>
  <div v-if="accesoAutorizado" class="lobby-fixed">
    <Navbar />
    <section id="auditorio">
      <Auditorium />
    </section>

    <section id="asesor">
      <Asesor />
    </section>

    <section id="speakers">
      <Carrusel />
    </section>

    <section id="cronograma">
      <Schedule />
    </section>

    <section id="footer">
      <Footer />
    </section>
  </div>
</template>

<style scoped src="../css/lobby.css" />
<style scoped>
.floating-container {
  position: fixed;
  bottom: 30px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  animation: bounce 1.8s infinite;
}

.floating-button {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.floating-button:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.3);
}

.floating-label {
  color: white;
  font-weight: bold;
  padding: 2rem 0;
  border-radius: 20px;
  font-size: 1rem;
  white-space: nowrap;
  animation: bounce 1.8s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
}


@media screen and (max-width: 600px) {
  .floating-container {
    bottom: 15px;
    right: 15px;
  }

  .floating-button {
    width: 45px;
    height: 45px;
    font-size: 22px;
    line-height: 45px;
  }

  .floating-label {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  svg.icon-btn-flotante {
    width: 20px;
    height: 20px;
  }
}

</style>
