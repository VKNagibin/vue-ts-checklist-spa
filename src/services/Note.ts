import { nanoid } from "nanoid";
import INote from "@/interfaces/INote";
import ITodo from "@/interfaces/ITodo";


export default class Note {
    id = nanoid()
    heading = "Новая заметка"
    todos: ITodo[] | [] = []

    constructor ( props?: INote ){
        if ( !props ) return
        this.id = props.id;
        this.heading = props.heading;
        this.todos = props.todos;
    }
}