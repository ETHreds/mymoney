<template>
  <div class="">
    <q-list padding>

      <q-item>
        <q-item-section avatar top>
          <q-avatar icon="person" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label caption>Welcome Back</q-item-label>
          <q-item-label lines="1">{{ userName }} 👋</q-item-label>

        </q-item-section>

        <q-item-section side>
          <q-icon name="message" color="green" />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script setup>

defineProps({
  userName: String
})

</script>

<style scoped>
.external-label-container {
  display: flex;
  align-items: center;
}

.external-label {
  margin-right: 10px;
}
</style>
