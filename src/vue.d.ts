import { Store } from 'vuex'
import IServices from "./interfaces/IServices"

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<any>
    }
    interface ComponentCustomProperties {
        $services: IServices
    }
}