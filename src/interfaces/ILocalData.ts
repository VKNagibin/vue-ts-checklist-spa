import INote from "@/interfaces/INote";
import ITodo from "@/interfaces/ITodo";

export default interface ILocalData {
    getNotesArray(): INote[] | [];
    setNotesArray(value: INote[]): void;
    getTodosArray(): ITodo[] | [];
    setTodosArray(value: ITodo[]): void;
}