<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
        control-color="white" navigation padding arrows height="auto" class="shadow-1 rounded-borders">
        <q-carousel-slide name="style" class="column bg-primary text-white no-wrap flex-center">
          <div class=" text-center">
            Cash Balance
          </div>
          <q-checkbox v-model="right2" left-label :label="'KSh . ' + totalAmount" checked-icon="visibility"
            unchecked-icon="star_border" color="warning" :class="{ 'blurred-label': !right2 }" />
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column bg-positive  text-white no-wrap flex-center">
          <div class=" text-center">
            Savings Balance
          </div>
          <q-checkbox v-model="right2" left-label :label="'KSh . ' + totalAmount" checked-icon="visibility"
            unchecked-icon="star_border" color="warning" :class="{ 'blurred-label': !right2 }" />
        </q-carousel-slide>
        <q-carousel-slide name="loan" class="column bg-negative text-white no-wrap flex-center">
          <div class=" text-center">
            Loan Balance
          </div>
          <q-checkbox v-model="right2" left-label :label="'KSh . ' + totalAmount" checked-icon="visibility"
            unchecked-icon="star_border" color="warning" :class="{ 'blurred-label': !right2 }" />
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const slide = ref('style')
const right2 = ref(true)
const totalAmount = ref(1000)
</script>
<style>
.blurred-label {
  filter: blur(3px);
}
</style>
