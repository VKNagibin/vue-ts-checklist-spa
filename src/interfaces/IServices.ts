import ILocalData from "@/interfaces/ILocalData";
import {StoreType} from "@/store";
import IRouter from "@/interfaces/IRouter";
import INote from "@/interfaces/INote";

export interface IConstructor {
    localData: ILocalData,
    history: string,
    store: StoreType,
    router: IRouter,
}

export default interface IServices {
    readNotesArray(): INote[],

    getLocalNotesArray(): void,

    addNewNote(): void,

    updateNotesArray(value: INote[]): void,

    redirectTo(path: string): void,

    setRouteId(id: string): void

    getRouteId(): string,

    getNoteTodos(id: string): void,

    getNoteHeadingById(id: string): string,

    createTodo(parentId: string): void,
}