import { StoreType } from "@/store";
import IServices, { IConstructor } from "@/interfaces/IServices";
import ILocalData from "@/interfaces/ILocalData";
import IRouter from "@/interfaces/IRouter";
import IHistory from "@/interfaces/IHistory";
import {IDataEditing} from "@/interfaces/IDataEditing";
import INote from "@/interfaces/INote";
import ITodo from "@/interfaces/ITodo";

export default class Services{
    #history: IHistory;
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

    #setNotesFromLocalToStore() {
        this.#store.dispatch(
            "setNotesFromLocal",
            this.#localData.getNotesArray()
        );
    }

    getSingleTodo(id: string): ITodo {
        return this.#store.getters.todo(id);
    }

    #setTodosFromLocalToStore() {
        this.#store.dispatch(
            "setTodosFromLocal",
            this.#localData.getTodosArray()
        );
    }

    editNoteHeading({ id, content }: IDataEditing) {
        this.#store.dispatch(
            "editNoteHeading",
            {id, content}
        );
    }

    saveNoteState(note: INote) {
        this.#history.saveNoteState(note);
    }

    editTodoContent( { id, content }: IDataEditing) {
        this.#store.dispatch(
            "editTodoContent",
            {id, content}
        );
        this.updateLocalTodos();
    }

    replaceNote({ id, note }: {id: string, note: INote}) {
        this.#store.dispatch("replaceNote",{ id, note });
    }

    replaceTodos({ parentId, todos }: { parentId: string, todos: ITodo[] }) {
        this.#store.dispatch("replaceTodos",{ parentId, todos });
    }

    getNotesArrayFromStore() {
        return this.#store.getters.notes;
    }

    getNoteFromStore(id: string) {
        return this.#store.getters.note(id);
    }

    getNextChange() {
        return this.#history.getNextChange();
    }

    getPreviousChange() {
        return this.#history.getPreviousChange();
    }

    getChangesCounter() {
        return this.#history.getChangesCounter();
    }

    getTodosArrayFromStore() {
        return this.#store.getters.todos;
    }

    deleteTodo(id: string) {
        this.#store.dispatch("deleteTodo", id);
        this.updateLocalTodos();
    }

    createTodo(parentId: string) {
        this.#store.dispatch("createTodo", parentId);
    }

    setCurrentNoteTodos(id: string) {
        const todos = this.#store.getters.currentNoteTodos(id) || [];
        this.#store.dispatch(
            "setCurrentNoteTodos",
            {
                id,
                todos,
            });
        return todos;
    }

    getNoteHeadingById(id: string) {
        return this.#store.getters.note(id).heading;
    }

    setInitialNoteState(note: INote) {
        this.#history.setInitialState(note);
    }

    getInitialNoteState() {
        return this.#history.getInitialState();
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