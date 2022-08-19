import INote from "@/interfaces/INote";
import Note from "@/services/Note";

interface IState {
    notesArray: INote[]
}

const findNoteIndex = (state: IState, id: string) => (
    state.notesArray.findIndex(item => item.id === id)
)

function deleteNote(state: IState, index: number) {
    if ( index === -1) return
    state.notesArray.splice(index, 1);
}

export default {
    state: (): IState => (
        {
            notesArray: [],
        }),
    mutations: {
        ADD_NEW_NOTE(state: IState) {
            state.notesArray = [...state.notesArray, new Note()];
        },
        DELETE_NOTE(state: IState, id: string) {
            const noteIndex = findNoteIndex(state, id);
            deleteNote(state, noteIndex);
        }
    },
    actions: {
        addNewNote({ commit }: any) {
            commit("ADD_NEW_NOTE");
        },
        deleteNote({ commit }: any, id: string) {
            commit("DELETE_NOTE", id);
        }
    },
    getters: {
        notesArray(state: IState) {
            return state.notesArray
        }
    }

}
