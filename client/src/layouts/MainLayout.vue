<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-tabs align="center">
        <q-route-tab to="/home" label="Home" />
        <q-route-tab to="/accounts" label="accounts" />
        <q-route-tab to="/goals" label="Goals" />

      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>

</script>
