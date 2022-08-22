import INote from "@/interfaces/INote";
import Note from "@/services/Note";

interface IState {
    notesArray: INote[]
}

const findNoteIndex = (state: IState, id: string) => (
    state.notesArray.findIndex(item => item.id === id)
)

const findArrayElement = (state: IState, id: string) => {
    return state.notesArray.find(item => {
        return item.id === id
    })
}


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
        },
        GET_LOCAL_NOTES_ARRAY(state: IState, localNotesArray: INote[]) {
            state.notesArray = [ ...localNotesArray ];
        }
    },

    actions: {
        addNewNote({ commit }: any) {
            commit("ADD_NEW_NOTE");
        },
        deleteNote({ commit }: any, id: string) {
            commit("DELETE_NOTE", id);
        },
        getLocalNotesArray({ commit }: any, localNotesArray: INote[]) {
            commit("GET_LOCAL_NOTES_ARRAY", localNotesArray);
        },
    },

    getters: {
        notesArray(state: IState) {
            return state.notesArray;
        },
        noteHeading:(state: IState) => (id: string) => {
            const note = findArrayElement(state, id);
            if (!note) return
            return note.heading;
        }
    }

}
