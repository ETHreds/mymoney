<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="q-pa-md">
        <div class="absolute-center">
          <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
            <q-tab class="text-purple" name="sign-in" label="Sign In" />
            <q-tab class="text-orange" name="sign-up" label="Sign Up" />
          </q-tabs>

          <div class="q-gutter-y-sm">
            <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade">
              <q-tab-panel name="sign-in">
                <q-form @submit.prevent="onSignIn" class="q-gutter-md">
                  <q-input color="purple-12" v-model="signin.email" label="Email"
                    :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Email must be valid']">
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>

                  <q-input color="purple-12" v-model="signin.password" label="Password" type="password"
                    :rules="[val => !!val || 'Password is required']">
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>
                  <q-checkbox v-model="remember" label="Remember me" checked-icon="task_alt"
                    unchecked-icon="highlight_off" class="text-weight-thin text-caption" />

                  <div>
                    <q-btn label="Sign In" type="submit" color="primary" :disabled="!validSignIn" />
                  </div>
                </q-form>
              </q-tab-panel>

              <q-tab-panel name="sign-up">
                <q-form @submit.prevent="onSignUp" class="q-gutter-md">
                  <q-input color="purple-12" v-model="reg.name" label="Name">
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>

                  <q-input color="purple-12" v-model="reg.email" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>

                  <q-input color="purple-12" v-model="reg.password" label="Password">
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>
                  <q-checkbox v-model="accept" label="I agree to T&C" checked-icon="task_alt"
                    unchecked-icon="highlight_off" class="text-weight-thin text-caption" />

                  <div></div>
                  <div>
                    <q-btn label="Register" type="submit" color="primary" :disabled="!accept" />
                  </div>
                </q-form>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth.store.js'

const authStore = useAuthStore()

const $q = useQuasar()
const tab = ref('sign-in')
const accept = ref(false)
const remember = ref(false)
const reg = ref({
  name: '',
  email: '',
  password: ''
})
const signin = ref({
  email: '',
  password: ''
})

const onSignUp = async () => {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }

  try {
    authStore.isSubmitting = true
    console.log(111156789011)
    await authStore.signUp(reg.value)
    console.log(11100000111)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Account created. You can now Sign In'
    })
    tab.value = 'sign-in'
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Error occurred. Retry after a while'
    })
  } finally {
    authStore.isSubmitting = false
  }
}

const onSignIn = async () => {
  try {
    authStore.isSubmitting = true
    console.log(111111111)
    await authStore.signIn(signin.value)
    if (!authStore.error) {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Signed In successfully'
      })
    } else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'cloud_done',
        message: authStore.error
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const validSignIn = computed(() => {
  return signin.value.email && /.+@.+\..+/.test(signin.value.email) && signin.value.password
})
</script>
