import { boot } from 'quasar/wrappers'
import vue3GoogleLogin from 'vue3-google-login'

export default boot(async ({ app }) => {
  app.use(vue3GoogleLogin, {
    clientId: '597891198789-pl3cmc8omkvfr7oa77sqg80hhfp38qkb.apps.googleusercontent.com'
  })
})
