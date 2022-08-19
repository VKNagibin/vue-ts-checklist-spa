import INote from "@/interfaces/INote";

export default interface IStore {
    getters: {
        notesArray(): INote[],
    }
}