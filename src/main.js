import Vue from 'vue'
import App from './App.vue'

// IMPORTATION DES LISTES DE DONNEES
import { membersList } from './lists/membersList'
import { collegesList } from './lists/collegesList'
import { resolutionsList } from './lists/resolutionsList'
import { votesList } from './lists/votesList'
//FIN IMPORTATION

Vue.config.productionTip = false

// ON LES REND DISPONIBLE DANS TOUT LE SITE
Vue.prototype.$membersList = membersList
Vue.prototype.$collegesList = collegesList
Vue.prototype.$resolutionsList = resolutionsList
Vue.prototype.$votesList = votesList
// FIN

new Vue({
  render: h => h(App),
}).$mount('#app')