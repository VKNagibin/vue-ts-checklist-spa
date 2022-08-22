import INote from "@/interfaces/INote";

export default class LocalData {
    getNotesArray(): INote[] | [] {
        const localNotesArray = LocalData.#getStorageItem<INote[]>("notesArray");
        if ( !localNotesArray ) return [];
        return localNotesArray
    }

    setNotesArray(value: INote[]): void {
        LocalData.#setStorageItem<INote[]>('notesArray', value);
    }

    static #getStorageItem<Type>(item: string): Type | null {
        const json = localStorage.getItem(item);
        if (!json) return null
        return JSON.parse(json);
    }

    static #setStorageItem<Type>(name: string, value: Type): void {
        const preparedItem = JSON.stringify(value);
        localStorage.setItem(name, preparedItem);
    }
}