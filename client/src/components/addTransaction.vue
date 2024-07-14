<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="transaction.date">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="q-gutter-sm">
            <q-radio keep-color v-model="transaction.type" val="income" label="Income" color="teal" />
            <q-radio keep-color v-model="transaction.type" val="expense" label="Expense" color="orange" />
          </div>
          <q-input filled v-model="transaction.account" label="Account *" hint="Paid from / received to" lazy-rules
            :rules="[val => val && val.length > 0 || 'Cannot be Empty']" />
          <q-input filled v-model="transaction.name" label="Name *" hint="Organisation paid / received from" lazy-rules
            :rules="[val => val && val.length > 0 || 'Cannot be Empty']" />
          <q-input filled type="number" v-model="transaction.amount" label="Amount *" lazy-rules :rules="[
            val => val !== null && val !== '' || 'Please type amount',
          ]" />
          <q-card-actions align="right">
            <q-btn type="submit" color="primary" label="Add" />
            <q-btn type="reset" color="primary" flat label="Cancel" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, computed, watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useTransactionStore } from '../stores/transationsStore'

const transactionStore = useTransactionStore()

const emits = defineEmits(['add-transaction'])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const transaction = ref({
  date: '2019-02-01 12:44',
  account: '',
  type: '',
  name: '',
  amount: ''

})

const onSubmit = () => {
  onDialogOK(transaction.value)
  transactionStore.addTransaction(transaction.value)
  emits('add-transaction', transaction.value)
}

const onReset = () => {
  onDialogCancel()
}
</script>
