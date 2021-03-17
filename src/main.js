import Vue from 'vue'
import App from './App.vue'
import { membersList } from './lists/membersList'
import { collegesList } from './lists/collegesList'
import { resolutionsList } from './lists/resolutionsList'

Vue.config.productionTip = false

Vue.prototype.$membersList = membersList
Vue.prototype.$collegesList = collegesList
Vue.prototype.$resolutionsList = resolutionsList

new Vue({
  render: h => h(App),
}).$mount('#app')