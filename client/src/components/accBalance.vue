<template>
  <div>
    <q-carousel v-model="slide" swipeable animated padding arrows navigation control-color="purple"
      navigation-position="bottom" height="auto" class=" text-primary rounded-borders">
      <q-carousel-slide name="cash" class="flex-center">
        <q-card class="my-card bg-purple text-white">
          <q-card-section>
            <div class="text-h6">Cash Balance</div>
            <div class="text-h4"> Ksh
              <slot name="cash"></slot>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="saving" class=" flex-center">
        <q-card class="my-card bg-purple text-white">
          <q-card-section>
            <div class="text-h6">Saving Balance</div>
            <div class="text-h4"> Ksh
              <slot name="saving"></slot>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="total" class=" flex-center">
        <q-card class="my-card bg-purple text-white">
          <q-card-section>
            <div class="text-h6">Total Balance</div>
            <div class="text-h4"> Ksh
              <slot name="total"></slot>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref('cash')
</script>

<style lang="scss" scoped></style>
