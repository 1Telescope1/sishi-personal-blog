import { createApp,Directive } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import pinia from "./store/index";
import "@/assets/styles/index.scss";
// import "@/assets/fonts/font.css"
// 图片懒加载
import lazyPlugin from 'vue3-lazy'
import loading from "./assets/images/loading.gif"
import error from "./assets/images/404.gif"
// svg图标
import 'virtual:svg-icons-register'

// 自定义指令
import * as directive from "@/directive";


const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(lazyPlugin,{
  loading,
  error
})
Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

app.mount(`#app`);
