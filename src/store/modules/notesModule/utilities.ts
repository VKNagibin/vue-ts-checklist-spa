import {IState} from "@/store/modules/notesModule/index";

export const findNoteIndex = (state: IState, id: string) => (
    state.notesArray.findIndex(item => item.id === id)
)

export const findArrayElement = (state: IState, id: string) => {
    return state.notesArray.find(item => {
        return item.id === id
    })
}

export function deleteNote(state: IState, index: number) {
    if ( index === -1) return
    state.notesArray.splice(index, 1);
}