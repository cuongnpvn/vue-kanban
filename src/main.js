import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import app from "./firebase";

createApp(App).use(app).use(store).use(router).mount("#app");
