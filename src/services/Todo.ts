import ITodo from "@/interfaces/ITodo";

class Todo {
    id: string ;
    checked: boolean;
    content: string;
    parentId: string;

    constructor({ id, checked, content, parentId }: ITodo) {
        this.id = id;
        this.checked = checked;
        this.content = content;
        this.parentId = parentId;
    }
}