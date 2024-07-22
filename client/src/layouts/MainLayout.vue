<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Moneywise
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-tabs align="center">
        <q-route-tab to="/page1" label="Page One" />
        <q-btn label="Add Transaction" color="primary" @click="openAddTransactionDialog" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
// import { ref } from 'vue'
import { useQuasar } from 'quasar'
import AddTransaction from '../components/addTransaction.vue'

const $q = useQuasar()

const openAddTransactionDialog = () => {
  $q.dialog({
    component: AddTransaction
  }).onOk(data => {
    console.log('Transaction added:', data)
  }).onCancel(() => {
    console.log('Dialog cancelled')
  })
}
</script>
