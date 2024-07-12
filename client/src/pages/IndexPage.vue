<template>
  <q-page class="">
    <hello-user userName='John Doe' />
    <acc-balance>
      <template #cash>
        {{ accountData.cash }}
      </template>
      <template #saving>
        {{ accountData.saving }}
      </template>
      <template #total>
        {{ total }}
      </template>
    </acc-balance>
    <inex-graph></inex-graph>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

import helloUser from '../components/helloUser.vue'
import accBalance from '../components/accBalance.vue'
import inexGraph from '../components/inexGraph.vue'

const accountData = ref({
  cash: 100,
  saving: 210,
  loan: -150
})
const total = computed(() => {
  return Object.values(accountData.value).reduce((acc, value) => acc + value, 0)
})
</script>
