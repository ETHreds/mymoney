<template>
  <div>
    <p>Transactions History</p>

    <q-list bordered class="rounded-borders" width="100%">
      <q-item v-for="transaction in transactions" :key="transaction.id" clickable v-ripple class="transaction-item">
        <q-item-section avatar top>
          <q-avatar icon="folder" :color="getColor(transaction.amount)" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ transaction.name }}</q-item-label>
          <q-item-label caption lines="2">{{ transaction.category }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-md flex">
            <p :class="{ 'text-negative': transaction.amount < 0, 'text-positive': transaction.amount > 0 }">{{
              transaction.amount < 0 ? '-' : '' }}{{ Math.abs(transaction.amount) }}</p>
                <q-btn size="12px" flat dense round icon="more_vert"> <q-menu transition-show="flip-right"
                    transition-hide="flip-left">
                    <q-list style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section @click.stop="deleteTransaction(transaction.id)">Delete</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="editTransaction(transaction)">Edit</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
          </div>
        </q-item-section>
      </q-item>

      <q-separator v-if="index < transactions.length - 1" :key="'sep-' + transaction.id" inset="item" />
    </q-list>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['edit-transaction', 'delete-transaction'])

const getColor = (amount) => {
  return amount < 0 ? 'negative' : 'positive'
}

// const getIcon = (amount) => {
//   return amount < 0 ? 'info' : 'money'
// }

const editTransaction = (transaction) => {
  emits('edit-transaction', transaction)
}

const deleteTransaction = (transactionId) => {
  emits('delete-transaction', transactionId)
}
</script>

<style scoped>
.transaction-item {
  position: relative;
}

.delete-btn,
.edit-btn {
  cursor: pointer;
  background-color: #e74c3c;
  border: 0;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.delete-btn {
  left: 10px;
}

.edit-btn {
  right: 10px;
  background-color: #2ecc71;
}

.transaction-item:hover .delete-btn,
.transaction-item:hover .edit-btn {
  opacity: 1;
}
</style>
