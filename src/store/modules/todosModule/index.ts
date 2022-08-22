import ITodo from "@/interfaces/ITodo";
import Todo from "@/services/Todo"

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

        DELETE_TODO(state: IState, id: string) {
            const todoIndex = findTodoIndex(state, id);
            deleteNote(state, todoIndex);
        },
    },
    actions: {
        createTodo({ commit }: any, parentId: string) {
            commit("CREATE_TODO", parentId);
        },
        deleteTodo({ commit }: any, id: string) {
            commit("DELETE_TODO", id);
        },
    },
    getters: {
        getNoteTodos:(state: IState) => (parentId: string) => filterTodosById(state, parentId),

    }

}
