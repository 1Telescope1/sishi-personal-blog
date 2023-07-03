import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import pinia from "./store/index";
import "@/assets/styles/index.scss";
import "@/assets/fonts/font.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app.use(router);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount(`#app`);
