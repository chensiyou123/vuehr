// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {deleteRequest, getRequest, postRequest, putRequest} from './utils/api'
import {initMenu} from './utils/utils'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
/* eslint-disable no-new */
router.beforeEach((to, from, next)=> {
  if (to.name == 'Login') {
    next();
    return;
  }
  var name = store.state.user.name;
  if (name == '未登录') {
    if (to.meta.requireAuth || to.name == null) {
      next({path: '/', query: {redirect: to.path}})
    } else {
      next();
    }
  }else {
    initMenu(router, store);
    if(to.path=='/chat'){
      store.commit("updateMsgList", []);
      next();
    }else {
      next()
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
