import INote from "@/interfaces/INote";

export default interface ILocalData {
    getNotesArray(): INote[] | null;
    setNotesArray(value: INote[]): void;
}