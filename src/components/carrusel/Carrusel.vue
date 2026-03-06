<template>
    <p class="title-s">SPEAKERS</p>
  <div class="carousel-container">

    <div class="carousel-section">
      <span class="nav-arrow left" @click="prevSlide" :class="{ disabled: isLoading }">&#10094;</span>
      
      <div class="image-wrapper">
        <img 
          :src="currentItem.image" 
          alt="Imagen del carrusel" 
          class="carousel-image"
          :class="{ loading: isLoading }"
          @load="onImageLoad"
        />
        <div v-if="isLoading" class="loading-spinner"></div>
      </div>

      <span class="nav-arrow right" @click="nextSlide" :class="{ disabled: isLoading }">&#10095;</span>
    </div>


    <div class="text-section">
      <h2>{{ currentItem.name }}</h2>
      <p>{{ currentItem.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageCarousel",
  data() {
    return {
      currentIndex: 0,
      isLoading: false,
      preloadedImages: new Set(),
      items: [
  {
    name: 'Álvaro Luque',
    image: '/images/Luque.jpg',
    description:
      'Fundador de Luque Academy, CEO, autor best seller y uno de los líderes más influyentes del ecosistema de emprendimiento digital en Latinoamérica. Ha impactado la vida de más de 3,800 emprendedores y usa una metodología que ha transformado cientos de negocios a través de estrategias exitosas en lanzamientos digitales, crecimiento empresarial y monetización estratégica.'
  },
  {
    name: 'Andrés Ricci',
    image: '/images/Ricci.jpg',
    description:
      'Con 5 años de experiencia ha hecho más de 80 lanzamientos digitales facturando cerca de 2 millones de dólares. Actualmente cuenta con 847 estudiantes en sus propios programas y ha sido lanzador de otros expertos en múltiples nichos a través del modelo agencia de lanzamientos. Coach en dinámicas de alto impacto y promotor del mensaje: ¡Si Puedo, Soy Capaz, ¡Soy Valiente!'
  },
  {
    name: 'Juan José Arenales',
    image: '/images/Juanjo.jpg',
    description:
      'Empresario, inversionista y mentor, Mercadologo con MBA, con más de 25 años de experiencia en varias industrias como construcción, bolsa de valores, banca corporativa y negocios digitales. He mentoreado a más de 8,000 emprendedores. La Misión de mi vida es ayudar a prosperar a los empresarios.'
  },
    {
    name: 'Dilio Donado',
    image: '/images/Dilio.jpg',
    description:
      'Dilio Donado es un líder visionario, empresario y consultor estratégico con una destacada trayectoria en la creación, escalamiento y transformación de negocios. Con más de una  década de experiencia, ha sido responsable de impulsar múltiples empresas en diversos sectores, guiándolas desde etapas iniciales hasta convertirse en modelos sostenibles, rentables y orientados al crecimiento.'
  },
    {
    name: 'Paola Luque',
    image: '/images/Paola.jpg',
    description:
      'Directora de Operaciones de Luque Academy. Es especialista en convertir la visión empresarial en estructuras, procesos y equipos que generan crecimiento sostenible.  Con más de 20 años de experiencia en liderazgo, ha desarrollado sistemas de gestión que permiten a empresas físicas y digitales escalar con orden, claridad y rentabilidad.'
  },
    {
    name: 'Tian Rodriguez',
    image: '/images/Tian.jpg',
    description:
      'No soy el típico financiero bien vestido o de mansión con Lamborghini. Soy el tipo con gorra y chanclas que te habla sin filtro para empujarte a tomar acción. Mi lujo más grande no es tener carro o “pinta de millonario”. Es poder elegir qué hacer con mi tiempo. El tiempo sí se compra y te voy a enseñar cómo. Sebastián Rodríguez, ingeniero industrial con énfasis en finanzas de la Universidad de los Andes. Fundador y CEO de 𝘛𝘪𝘢𝘯 𝘙𝘰𝘥𝘳í𝘨𝘶𝘦𝘻 𝘓𝘍, marca dedicada a impartir educación financiera. Más de 4.400 estudiantes han pasado por mis programas educativos.'
  }
],
    };
  },
  computed: {
    currentItem() {
      return this.items[this.currentIndex];
    },
    nextIndex() {
      return (this.currentIndex + 1) % this.items.length;
    },
    prevIndex() {
      return (this.currentIndex - 1 + this.items.length) % this.items.length;
    }
  },
  mounted() {
    // Precargar imagen actual y siguiente
    this.preloadImage(this.currentItem.image);
    this.preloadImage(this.items[this.nextIndex].image);
  },
  methods: {
    preloadImage(src) {
      if (this.preloadedImages.has(src)) return;
      
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
      };
      img.src = src;
    },
    onImageLoad() {
      this.isLoading = false;
    },
    prevSlide() {
      if (this.isLoading) return;
      this.isLoading = true;
      this.currentIndex = this.prevIndex;
      this.preloadImage(this.items[this.prevIndex].image);
    },
    nextSlide() {
      if (this.isLoading) return;
      this.isLoading = true;
      this.currentIndex = this.nextIndex;
      this.preloadImage(this.items[this.nextIndex].image);
    },
  },
};
</script>


<style scoped src="./carrusel.css" />
