import Vue from 'vue'
import App from './App.vue'
import { membersList } from './lists/membersList'

Vue.config.productionTip = false

Vue.prototype.$membersList = membersList

new Vue({
  render: h => h(App),
}).$mount('#app')