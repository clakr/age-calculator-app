import { createApp } from "vue";
import App from "./App.vue";
import authorModal from "./_authorModal";
import projectConfig from "./_projectConfig";
import "./_preflight.css";
import "./style.scss";

createApp(App).use(projectConfig).use(authorModal).mount("#app");
