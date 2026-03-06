<template>
  <section class="cronograma">
    <div>
      <h2 class="title-crono">Cronograma</h2>
    </div>
    <div class="contenedor">
      <div v-for="(day, index) in days" :key="index" class="columna">
        <div class="numero">{{ day.numero }}</div>
        <h3 class="columna-titulo">{{ day.title }}</h3>
        <div class="columna-descripcion">{{ day.descripcion }}</div>
        <div v-if="index < days.length - 1" class="divisor"></div>
      </div>
    </div>

  </section>
</template>

<script setup>
const days = [
  {
    numero: '01',
    title: 'Acelera en Ventas',
    descripcion: '9:00 am - 1:00 pm Bloque de contenido\n1:00 pm - 2:00 pm Almuerzo\n2:00 pm - 4:15 pm Bloque contenido\n4:15 pm - 5:15 pm Break\n5:15 pm - 6:00 pm Bloque de contenido'
  },
  {
    numero: '02',
    title: 'Acelera en Productividad',
    descripcion: '9:00 am - 1:00 pm Bloque de contenido\n1:00 pm - 2:00 pm Almuerzo\n2:00 pm - 4:15 pm Bloque contenido\n4:15 pm - 5:15 pm Break\n5:15 pm - 7:00 pm Bloque de contenido'
  },
  {
    numero: '03',
    title: 'Acelera en Rentabilidad',
    descripcion: '9:00 am - 1:00 pm Bloque de contenido\n1:00 pm - 2:00 pm Almuerzo\n2:00 pm - 4:15 pm Bloque contenido\n4:15 pm - 5:15 pm Break\n5:15 pm - 6:00 pm Bloque de contenido'
  }
]
</script>

<style scoped src="./cronograma.css" />
