import { createApp } from 'vue'
import App from './App.vue'
import infiniteScroll from './plugin/index'
console.log(infiniteScroll)
// import './index.css'
const app = createApp(App)
app.use(infiniteScroll).mount('#app')