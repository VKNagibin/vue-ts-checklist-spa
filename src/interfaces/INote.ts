import ITodo from "@/interfaces/ITodo";

export default interface INote {
    id: string;
    todos: ITodo[] | [];
    heading: string;
}