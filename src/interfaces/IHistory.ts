import INote from "@/interfaces/INote";

export default interface IHistory {
    setInitialState(note: INote): void,
    saveNoteState(note: INote): void,
    getInitialState(): INote | null,
    clearChangesHistory(): void,
    getChangesCounter(): number,
    getPreviousChange(): INote | void,
    getNextChange(): INote | void,
}