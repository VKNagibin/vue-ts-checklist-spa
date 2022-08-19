import ILocalData from "@/interfaces/ILocalData";
import {StoreType} from "@/store";
import IRouter from "@/interfaces/IRouter";

export default interface IConstructor {
    localData: ILocalData,
    history: string,
    store: StoreType,
    router: IRouter,
}