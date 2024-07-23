<template>
  <div>
    <div class="text-h6 text-weight-bold">Quick Actions</div>

    <div class="q-pa-md q-gutter-sm flex-center">
      <div class="container">
        <q-btn id="myButton" round color="negative" icon="add" @click="openAddTransactionDialog" />
        <label for="myButton" class="text-weight-light text-caption" lines="2"> Add Transaction </label>
      </div>
      <div class="container">
        <q-btn id="myButton" round color="secondary" icon="directions" @click="console.log('Hello')" />
        <label for="myButton" class="text-weight-light text-caption"> Transfer </label>
      </div>
      <div class="container">
        <q-btn id="myButton" round color="info" icon="map" @click="console.log('Hello')" />
        <label for="myButton" class="text-weight-light text-caption"> Budget </label>
      </div>
      <div class="container">
        <q-btn id="myButton" round color="primary" icon="lightbulb_outline" @click="console.log('Hello')" />
        <label for="myButton" class="text-weight-light text-caption">Insights</label>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useQuasar } from 'quasar'
import AddTransaction from './addTransaction.vue'

const $q = useQuasar()

const openAddTransactionDialog = () => {
  console.log('Hello World')
  $q.dialog({
    component: AddTransaction
  }).onOk(data => {
    console.log('Transaction added:', data)
  }).onCancel(() => {
    console.log('Dialog cancelled')
  })
}

</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
</style>
