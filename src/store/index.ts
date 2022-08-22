import { createStore } from 'vuex'
import todosModule from "@/store/modules/todosModule";
import notesModule from "@/store/modules/notesModule";

const store = createStore({
  modules: {
    todos: todosModule,
    notes: notesModule,
  }
})

export type StoreType = typeof store;

export default store;
