import Services from "../services/Services";
import store from "../store";
import router from "../router";
import LocalData from "../services/LocalData";
import {App} from "vue";
import History from "@/services/History";

export default {
    install: (app: App) => {
        app.config.globalProperties.$services = new Services(
                {
                    store: store,
                    router: router,
                    history: new History(),
                    localData: new LocalData(),
                })
        }
}