import { createApp } from 'vue'
import App from './App.vue'
import infiniteScroll from 'vue3-infinite-scroll-better'
console.log(infiniteScroll, 1)
// import './index.css'
const app = createApp(App)
app.use(infiniteScroll).mount('#app')