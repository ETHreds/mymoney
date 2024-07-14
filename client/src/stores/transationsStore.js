/* eslint-disable space-before-function-paren */
// stores/transaction.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: ref([
      { id: 1, name: 'Naivas Supermarket', category: 'Grocery', amount: -200 },
      { id: 2, name: 'Avanti Labs', category: 'Salary', amount: 1000 }
    ])
  }),
  actions: {
    addTransaction(transaction) {
      this.transactions.push(transaction)
    }
  }
})
