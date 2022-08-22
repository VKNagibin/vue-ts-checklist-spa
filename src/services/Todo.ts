import ITodo from "@/interfaces/ITodo";
import { nanoid } from "nanoid";

export default class Todo implements ITodo{
    id: string = nanoid() ;
    checked: boolean = false;
    content: string = "Новая задача";

    constructor( public parentId: string) {
    }
}