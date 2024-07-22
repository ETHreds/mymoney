<template>
  <ul class="gallery" ref="slider">
    <li v-for="(color, index) in colors" :key="index" :style="{ background: color }"></li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const colors = ['#f6bd60', '#f7ede2', '#f5cac3', '#84a59d', '#f28482']

const slider = ref(null)
let isDown = false
let startX
let scrollLeft

const handleMouseDown = (e) => {
  isDown = true
  slider.value.classList.add('active')
  startX = e.pageX - slider.value.offsetLeft
  scrollLeft = slider.value.scrollLeft
}

const handleMouseLeave = () => {
  isDown = false
  slider.value.classList.remove('active')
}

const handleMouseUp = () => {
  isDown = false
  slider.value.classList.remove('active')
}

const handleMouseMove = (e) => {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - slider.value.offsetLeft
  const SCROLL_SPEED = 3
  const walk = (x - startX) * SCROLL_SPEED
  slider.value.scrollLeft = scrollLeft - walk
}

onMounted(() => {
  const el = slider.value
  el.addEventListener('mousedown', handleMouseDown)
  el.addEventListener('mouseleave', handleMouseLeave)
  el.addEventListener('mouseup', handleMouseUp)
  el.addEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.gallery {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(10, 80vw);
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  overflow: scroll;
  scroll-snap-type: both mandatory;
  scroll-padding: 1rem;
}

.active {
  scroll-snap-type: unset;
}

li {
  scroll-snap-align: center;
  display: inline-block;
  border-radius: 3px;
  font-size: 0;
}
</style>
