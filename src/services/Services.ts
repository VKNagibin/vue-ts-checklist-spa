import { StoreType } from "@/store";
import IServices, { IConstructor } from "@/interfaces/IServices";
import ILocalData from "@/interfaces/ILocalData";
import IRouter from "@/interfaces/IRouter";
import INote from "@/interfaces/INote";
import ITodo from "@/interfaces/ITodo";
import {IDataEditing} from "@/interfaces/IDataEditing";

export default class Services{
    #history: string;
    #store: StoreType;
    #router: IRouter;
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

    setDataFromLocalToStore() {
        this.#setNotesFromLocalToStore();
        this.#setTodosFromLocalToStore();
    }

    editNoteHeading({ id, content }: IDataEditing) {
        this.#store.dispatch(
            "editNoteHeading",
            {id, content}
        );
        this.updateLocalNotesArray();
    }

    editTodoContent( { id, content }: IDataEditing) {
        this.#store.dispatch(
            "editTodoContent",
            {id, content}
        );
        this.updateLocalTodos();
    }

    #setNotesFromLocalToStore() {
        this.#store.dispatch(
            "setNotesFromLocal",
            this.#localData.getNotesArray()
        );
    }

    getNotesArrayFromStore() {
        return this.#store.getters.notes;
    }

    getTodosArrayFromStore() {
        return this.#store.getters.todos;
    }

    #setTodosFromLocalToStore() {
        this.#store.dispatch(
            "setTodosFromLocal",
            this.#localData.getTodosArray()
        );
    }

    deleteTodo(id: string) {
        this.#store.dispatch("deleteTodo", id);
        this.updateLocalTodos();
    }

    createTodo(parentId: string) {
        this.#store.dispatch("createTodo", parentId);

    }

    getCurrentNoteTodosFromStore(id: string) {
        return this.#store.getters.currentNoteTodos(id) || [];
    }
    getNoteHeadingById(id: string) {
        return this.#store.getters.note(id).heading;
    }

    #deleteNote(id: string) {
        this.#store.dispatch("deleteNote", id);
    }

    #deleteNoteChildren(id: string) {
        this.#store.dispatch("removeDeletedNoteChildren", id);
    }

    removeNoteWithChildren(id: string) {
        this.#deleteNote(id);
        this.updateLocalNotesArray();
        this.#deleteNoteChildren(id);
        this.updateLocalTodos();
    }

    addNewNote() {
        this.#store.dispatch("addNewNote");
    }

    handleTodoCheckbox(id: string) {
        this.#store.dispatch("handleTodoChecked", id);
        this.updateLocalTodos();
    }

    updateLocalNotesArray(): void {
        this.#localData.setNotesArray(
            this.getNotesArrayFromStore()
        );
    }

    updateLocalTodos(): void {
        this.#localData.setTodosArray(
            this.getTodosArrayFromStore()
        );
    }

    redirectTo(path: string) {
        this.#router.push(path);
    }
}



