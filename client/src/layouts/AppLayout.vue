<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>

    <q-footer bordered class=" text-white">
      <q-tabs align="center">
        <q-route-tab to="/user" label="Home" />
        <q-route-tab to="/accounts" label="accounts" />
        <q-route-tab to="/goals" label="Goals" />

      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>

</script>
