import INote from "@/interfaces/INote";

export default class LocalData {
    getNotesArray(): INote[] | null {
        return LocalData.#getStorageItem<INote[]>("notesArray");
    }

    setNotesArray(value: INote[]): void {
        return LocalData.#setStorageItem<INote[]>('notesArray', value)
    }

    static #getStorageItem<Type>(item: string): Type | null {
        const json = localStorage.getItem(item);
        if (!json) return null
        return JSON.parse(json);
    }

    static #setStorageItem<Type>(name: string, value: Type): void {
        const preparedItem = JSON.stringify(value);
        console.log(preparedItem);
        localStorage.setItem(name, preparedItem);
    }
}