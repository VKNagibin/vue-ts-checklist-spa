import INote from "@/interfaces/INote";
import Note from "@/services/Note";
import {IDataEditing} from "@/interfaces/IDataEditing";
import {
    findNoteIndex,
    deleteNote,
    findArrayElement
} from "@/store/modules/notesModule/utilities";

export interface IState {
    notesArray: INote[]
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
        EDIT_NOTE_HEADING(state: IState, { id, content }: IDataEditing ) {
            const currentNoteIndex = findNoteIndex(state, id);
            state.notesArray[currentNoteIndex].heading = content;
        },
        SET_NOTES_FROM_LOCAL(state: IState, localNotesArray: INote[]) {
            state.notesArray = [ ...localNotesArray ];
        },
    },

    actions: {
        addNewNote({ commit }: any) {
            commit("ADD_NEW_NOTE");
        },
        editNoteHeading({ commit }: any, { id, content }: IDataEditing) {
            commit("EDIT_NOTE_HEADING", { id, content });
        },
        deleteNote({ commit }: any, id: string) {
            commit("DELETE_NOTE", id);
        },
        setNotesFromLocal({ commit }: any, localNotesArray: INote[]) {
            commit("SET_NOTES_FROM_LOCAL", localNotesArray);
        },
    },

    getters: {
        notes(state: IState) {
            return state.notesArray;
        },
        note:(state: IState) => (id: string) => {
            const note = findArrayElement(state, id);
            if (!note) return
            return note;
        }
    }
}
