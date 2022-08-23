import ITodo from "@/interfaces/ITodo";
import Todo from "@/services/Todo"
import {IDataEditing} from "@/interfaces/IDataEditing";

interface IState {
    todos: ITodo[],
}

const findTodoIndex = (state: IState, id: string) => state.todos.findIndex(todo => todo.id === id);

function deleteNote(state: IState, index: number) {
    if ( index === -1) return
    state.todos.splice(index, 1);
}

const filterTodosById = (state: IState, parentId: string) => {
    if (!state.todos.length) return
    return state.todos.filter(todo => todo.parentId === parentId);
}

export default {
    state: (): IState => (
        {
            todos: [],
        }),
    mutations: {
        CREATE_TODO(state: IState, parentId: string ) {
            state.todos = [...state.todos, new Todo(parentId)];
        },

        EDIT_TODO_CONTENT(
            state: IState,
            { id, content } : IDataEditing
        ) {
            const currentTodoIndex = findTodoIndex(state, id);
            state.todos[currentTodoIndex].content = content;
        },

        HANDLE_TODO_CHECKBOX(state: IState, id: string) {
            const index = findTodoIndex(state, id);
            if (index === -1) return
            state.todos[index].checked = !state.todos[index].checked;
        },

        DELETE_TODO(state: IState, id: string) {
            const todoIndex = findTodoIndex(state, id);
            deleteNote(state, todoIndex);
        },

        REMOVE_DELETED_NOTE_CHILDREN(state: IState, id: string) {
            if (!state.todos.length) return
            const actualTodos = state.todos.filter(todo => todo.parentId !== id);
            state.todos = [...actualTodos];
        },

        SET_TODOS_FROM_LOCAL(state: IState, localTodos: ITodo[]) {
            state.todos = [...localTodos];
        }
    },
    actions: {
        createTodo({ commit }: any, parentId: string) {
            commit("CREATE_TODO", parentId);
        },
        deleteTodo({ commit }: any, id: string) {
            commit("DELETE_TODO", id);
        },
        editTodoContent(
            { commit }: any,
            { id, content }: IDataEditing
        ) {
            commit("EDIT_TODO_CONTENT", {id, content});
        },
        setTodosFromLocal({ commit }: any, localTodos: ITodo[]) {
            commit("SET_TODOS_FROM_LOCAL", localTodos);
        },
        removeDeletedNoteChildren({ commit }: any, id: string) {
            commit("REMOVE_DELETED_NOTE_CHILDREN", id);
        },
        handleTodoChecked({ commit }: any, id: string) {
            commit("HANDLE_TODO_CHECKBOX", id);
        }
    },
    getters: {
        currentNoteTodos:(state: IState) => (parentId: string) => filterTodosById(state, parentId),
        todos: (state: IState) =>  state.todos,
    }

}
