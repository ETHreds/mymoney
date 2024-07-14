<script setup>

</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  flex-direction: column;

}

.top {
  background-color: blue;
  width: 100px;
  height: 100px;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

}

.bottom {

  width: 100%;
  height: 80px;
  clip-path: polygon(0 0, calc(50% - 4.14px - 50px) 0, 50% calc(50px + 4.14px), calc(50% + 4.14px + 50px) 0, 100% 0, 100% 100%, 0 100%);
  margin-top: -40px;
}
</style>
<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf">
      <q-header bordered class="bg-grey-3 text-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
            </q-avatar>
            Quasar Framework
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-footer bordered class="bg-grey-3 text-primary">
        <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
          <q-tab name="images" label="Images" />
          <q-tab name="videos" label="Videos" />
          <q-tab name="articles" label="Articles" />
        </q-tabs>
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
