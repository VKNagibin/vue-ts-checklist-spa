import {IState} from "@/store/modules/todosModule";

export const findTodoIndex = (state: IState, id: string) => state.todos.findIndex(todo => todo.id === id);

export function deleteNote(state: IState, index: number) {
    if ( index === -1) return
    state.todos.splice(index, 1);
}

export const filterTodosById = (state: IState, parentId: string) => {
    if (!state.todos.length) return
    return state.todos.filter(todo => todo.parentId === parentId);
}