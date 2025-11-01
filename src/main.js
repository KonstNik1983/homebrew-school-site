import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Подключаем стили
import "./assets/styles/main.css";
import "./assets/styles/normalize.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);

app.use(router);
app.mount("#app");
