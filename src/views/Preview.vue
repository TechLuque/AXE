<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Ticket from '../components/ticket/Ticket.vue'

const nombre = ref('')
const cargando = ref(false)
const router = useRouter()

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyNubbJFPkUej0Dk0HhzP9qtOLx_yKS5jhfENql4rGmwdUXXM_FzcOXO9BdrV1JYYqk/exec'

const fetchNombre = async () => {
  const correo = localStorage.getItem('correo')
  if (!correo) return router.push('/')

  try {
    const res = await fetch(SHEET_API_URL)
    const data = await res.json()

    const user = data.email.find(entry => entry.email.trim().toLowerCase() === correo.trim().toLowerCase())

    if (user) {
      nombre.value = user.name.toUpperCase()
    } else {
      nombre.value = 'NO AUTORIZADO'
    }
  } catch (err) {
    console.error('Error al cargar los datos:', err)
    nombre.value = 'ERROR AL CARGAR'
  }
}

onMounted(() => {
  fetchNombre()
})

const handleIngresar = async () => {
  cargando.value = true

  router.push({
    name: 'Lobby',
    state: {
      correo: localStorage.getItem('correo'),
      nombre: nombre.value,
      yaAutenticado: true
    }
  })
}
</script>

<template>
  <div class="card-usu">
    <template v-if="!cargando">
      <div class="medium first">
        <div class="welcome">
          <div>
            <img src="/images/LOGO AXE R.png" alt="Launch Mastery Logo" class="logo-image-welcome" />
          </div>
          <button 
            type="button" 
            class="btn-entrada" 
            @click="handleIngresar"
          >
            INGRESAR AL LOBBY
            <span class="shimmer"></span>

          </button>
        </div>
      </div>
      <div class="medium second">
        <Ticket :nombre="nombre" />
      </div>
    </template>

    <div v-if="cargando" class="loading-container">
      <div class="loading-text">CARGANDO...</div>
    </div>
  </div>
</template>

<style scoped src="../css/lobby.css" />
<style scoped src="../css/preview.css" />
<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.loading-text {
  font-size: 2rem;
  font-weight: bold;
  color: #e7e7e7;
  animation: pulse 1s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}
</style>