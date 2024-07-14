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
    <transaction-history :transactions="transactions" @edit-transaction="editTransaction"
      @delete-transaction="deleteTransaction" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'

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
const transactions = ref([
  { id: 1, name: 'Naivas Supermarket', category: 'Grocery', amount: -200 },
  { id: 2, name: 'Avanti Labs', category: 'Salary', amount: 1000 }
])
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
  }
}
</script>
