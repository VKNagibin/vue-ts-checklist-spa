import {StoreType} from "@/store";
import IConstructor from "@/interfaces/IServices";
import ILocalData from "@/interfaces/ILocalData";
import IRouter from "@/interfaces/IRouter";
import INote from "@/interfaces/INote";

export default class Services {
    history: string;
    store: StoreType;
    router: IRouter;
    localData: ILocalData;

    constructor(
        {
            localData,
            history,
            store,
            router,
        }: IConstructor
    ){
        this.history = history;
        this.store = store;
        this.router = router;
        this.localData = localData
    }

    getNotesArray() {
        return this.store.getters.notesArray
    }

    addNewNote() {
        this.store.dispatch("addNewNote");
    }

    updateNotesArray(value: INote[]): void {
        this.localData.setNotesArray(value);
    }
}

