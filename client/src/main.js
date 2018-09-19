import Vue from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import Router from './router/index'
new Vue({
  el: '#app',
  Router,
  render: h => h(App)
})
