import ILocalData from "@/interfaces/ILocalData";
import {StoreType} from "@/store";
import IRouter from "@/interfaces/IRouter";
import INote from "@/interfaces/INote";
import ITodo from "@/interfaces/ITodo";

export interface IConstructor {
    localData: ILocalData,
    history: string,
    store: StoreType,
    router: IRouter,
}

export default interface IServices {
    getNotesArrayFromStore(): INote[],

    getTodosArrayFromStore(): ITodo[],

    updateLocalTodos(): void,

    setDataFromLocalToStore(): void,

    getCurrentNoteTodosFromStore(id: string): ITodo[],

    addNewNote(): void,

    removeNoteWithChildren(id: string): void,

    updateLocalNotesArray(): void,

    handleTodoCheckbox(id: string): void,

    redirectTo(path: string): void,

    updateCurrentNoteTodos(id: string): void,

    getNoteHeadingById(id: string): string,

    createTodo(parentId: string): void,
}