import INote from "@/interfaces/INote";
import {shallowClone} from "@/utilities/shallowClone";

export default class History {
    #changes: INote[] = [];
    #initialState: INote | null = null;
    #changesCounter: number = 0;

    setInitialState(note: INote) {
        this.#initialState = shallowClone<INote>(note);
        if (!this.#initialState) return
        this.#changes.push(
            this.#initialState
        )
    }

    getInitialState(): INote | null {
        return this.#initialState
    }

    getPreviousChange(): INote | void {
        if (this.#changesCounter - 1 < 0) return
        return this.#changes[--this.#changesCounter];
    }

    getNextChange(): INote | void {
        if (this.#changesCounter + 1 >= this.#changes.length) return
        this.#changesCounter++;
        console.log(this.#changes[this.#changesCounter]);
        return this.#changes[this.#changesCounter];
    }

    getChangesCounter() {
        return this.#changesCounter;
    }

    saveNoteState(note: INote) {
        this.#changes.push(shallowClone<INote>(note));
        this.#changesCounter++;
        console.log(this.#changes);
    }

    clearChangesHistory(): void {
        this.#changes = [];
        this.#initialState = null;
        this.#changesCounter = 0
    }
}