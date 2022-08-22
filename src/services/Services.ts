import { StoreType } from "@/store";
import IServices, { IConstructor } from "@/interfaces/IServices";
import ILocalData from "@/interfaces/ILocalData";
import IRouter from "@/interfaces/IRouter";
import INote from "@/interfaces/INote";

export default class Services implements IServices {
    #history: string;
    #store: StoreType;
    #router: IRouter;
    #routeId = '';
    #localData: ILocalData;

    constructor(
        {
            localData,
            history,
            store,
            router,
        }: IConstructor
    ){
        this.#history = history;
        this.#store = store;
        this.#router = router;
        this.#localData = localData
    }

    readNotesArray() {
        return this.#store.getters.notesArray
    }

    getLocalNotesArray() {
        this.#store.dispatch(
            "getLocalNotesArray",
            this.#localData.getNotesArray()
        );
    }

    createTodo(parentId: string) {
        this.#store.dispatch("createTodo", parentId)
    }

    setRouteId(id: string) {
        this.#routeId = id;
    }

    getRouteId() {
        return this.#routeId;
    }

    getNoteTodos(id: string) {
        return this.#store.getters.getNoteTodos(id);
    }

    getNoteHeadingById(id: string) {
        return this.#store.getters.noteHeading(id);
    }

    addNewNote() {
        this.#store.dispatch("addNewNote");
    }

    updateNotesArray(value: INote[]): void {
        this.#localData.setNotesArray(value);
    }

    redirectTo(path: string) {
        this.#router.push(path);
    }
}



