import ILocalData from "@/interfaces/ILocalData";
import {StoreType} from "@/store";
import IRouter from "@/interfaces/IRouter";
import INote from "@/interfaces/INote";
import ITodo from "@/interfaces/ITodo";
import IHistory from "@/interfaces/IHistory";

export interface IConstructor {
    localData: ILocalData,
    history: IHistory,
    store: StoreType,
    router: IRouter,
}

export default interface IServices {
    getNotesArrayFromStore(): INote[],

    getTodosArrayFromStore(): ITodo[],

    getSingleTodo(id: string): ITodo,

    updateLocalTodos(): void,

    setDataFromLocalToStore(): void,

    getCurrentNoteTodosFromStore(id: string): ITodo[],

    addNewNote(): void,

    getPreviousChange(): INote | void,

    getNoteFromStore(id: string): INote

    removeNoteWithChildren(id: string): void,

    updateLocalNotesArray(): void,

    saveNoteState(note: INote): void,

    getChangesCounter(): number,

    getPreviousChange(): INote,

    getNextChange(): INote,

    getChangesCounter(): number,

    getPreviousChange(): INote,

    getNextChange(): INote,

    replaceTodos({ parentId, todos }: { parentId: string, todos: ITodo[] }): void,

    handleTodoCheckbox(id: string): void,

    getInitialNoteState(): INote,

    setInitialNoteState(note: INote): void,

    redirectTo(path: string): void,

    replaceNote({ id, note }: {id: string, note: INote}): void

    setInitialNoteState(note: INote): void,

    editTodoContent( payload:
        {
            id: string,
            content: string
        }
    ): void

    setCurrentNoteTodos(id: string): void,

    updateCurrentNoteTodos(id: string): void,

    getNoteHeadingById(id: string): string,

    createTodo(parentId: string): void,
}