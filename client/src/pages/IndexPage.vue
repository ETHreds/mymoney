<template>
  <q-page class="">
    <hello-user :userName="userName" />
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
    <transaction-history :transactions="transactions" @edit-transaction="editTransaction"
      @delete-transaction="deleteTransaction" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import { useTransactionStore } from '../stores/transations.store'
import { useRoute } from 'vue-router'
import { api } from '../boot/axios'

const route = useRoute()
const userId = ref('')
const userName = ref('')
const userEmail = ref('')

onMounted(async () => {
  // Extract user ID from URL parameter
  userId.value = route.params.userId
  console.log('User ID:', userId.value) // Debug line

  if (!userId.value) {
    console.error('User ID is undefined')
    return
  }

  try {
    const response = await api.get(`http://localhost:3000/users/${userId.value}`)
    const user = response.data
    userName.value = user.name
    console.log('User Name:', userName.value) // Debug line
    userEmail.value = user.email
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})

const transactionStore = useTransactionStore()
const transactions = transactionStore.transactions

import helloUser from '../components/helloUser.vue'
import accBalance from '../components/accBalance.vue'
import inexGraph from '../components/inexGraph.vue'

import transactionHistory from '../components/transactionHistory.vue'

const $q = useQuasar()
const accountData = ref({
  cash: 100,
  saving: 210,
  loan: -150
})
const total = computed(() => {
  return Object.values(accountData.value).reduce((acc, value) => acc + value, 0)
})
const deleteTransaction = (transactionId) => {
  console.log(transactionId)
  transactions.value = transactions.value.filter(transaction => transaction.id !== transactionId)
  $q.notify({
    message: '  Transaction Deleted',
    color: 'primary'
  })
}
const editTransaction = (updatedTransaction) => {
  console.log('Edited Transaction:', updatedTransaction)
  const index = transactions.value.findIndex(transaction => transaction.id === updatedTransaction.id)

  if (index !== -1) {
    transactions.value[index] = updatedTransaction
    $q.notify({
      message: '  Transaction Deleted',
      color: 'primary'
    })
  }
}
</script>
