<template>
  <div class="wrapper">
  <div class="note-component-wrapper">
    <div class="note-flex-container">
      <h2 class="todo-heading">{{heading}}</h2>
      <ul class="todo-list">
        <li class="todo-list__item" v-for="todo in currentNoteTodos()" :key="todo.id">
          <input type="checkbox" class="todo-list__checkbox" disabled :checked="todo.checked">
          <span class="todo-list__span span_home-page">{{todo.content}}</span>
        </li>
      </ul>
    </div>

    <div class="note-buttons-group">
      <button-component scale="3">
        <template v-slot:leftIcon><BIconTrashFill /></template>
      </button-component>
      <button-component scale="3" @click="redirectToEditNotePage">
        <template v-slot:leftIcon><BIconPencilSquare /></template>
      </button-component>
    </div>

  <teleport to="body">
    <confirm-modal v-if="showModal" @response="(response) => handleModalAnswer(response)">
      Вы точно хотите удалить заметку?
    </confirm-modal>
  </teleport>
  </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from "./ButtonComponent.vue"
import ConfirmModal from "./ConfirmModal.vue";
import { defineComponent } from 'vue'
import ITodo from "@/interfaces/ITodo";

export default defineComponent({
  components: {
    ConfirmModal,
    ButtonComponent,
  },

  props: {
    todos: Array,
    heading: String,
    id: String,
    parentId: String,
  },

  data() {
    return {
      to: `/note/${this.$props.id}`,
      showModal: false,
      deleteRequest: false
    }
  },

  methods: {
    currentNoteTodos(): ITodo[] {
      const todos = (this.$props.todos) as ITodo[];
      if(!todos.length) return todos;
      return todos.slice(0, 3);
    },
    handleModalAnswer(answer: boolean) {
      if (this.deleteRequest && answer) {
        // let noteIndex = this.$store.getters.notesArray.findIndex(item => item.id === this.id);
        // this.$store.dispatch("deleteNote", noteIndex);
      }
      this.showModal = false;
    },

    redirectToEditNotePage() {
      if ( !this.$props.id) return
      this.to = `/note/${this.id}`;
      this.$services.redirectTo(this.to);
      this.$services.setRouteId(this.$props.id);
    },

    deleteNote() {
      this.showModal = true;
      this.deleteRequest = true;
    }
  },

  // updated() {
  //   this.$services.updateNotesArray(
  //
  //   )
  // }
  //
})

</script>

<style lang="scss">
  .note-component-wrapper {
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .note-flex-container {
    min-width: 400px;
    padding: 30px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    border: 2px solid rgba(141, 141, 141, 0.49);

    .todo-heading {
      font-size: 4rem;
      text-align: center;
    }
  }

  .note-buttons-group {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
    gap: 50px;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;

    &__item {
      width: 100%;
      font-size: 2rem;
      display: flex;
      gap: 40px;
      justify-content: flex-start;
      align-items: center;
      word-break: break-word;
    }

    &__span {
      display: block;
      max-width: 600px;
      text-align: left;
      padding: 20px;
      border: 5px solid rgba(221, 160, 221, 0.4);
      border-radius: 10px;
    }

    &__checkbox {
      transform: scale(2.5);
      transition: .2s;
      cursor: pointer;

      &:hover {
        transform: scale(3);
      }
    }
  }

  @media (max-width: 540px) {

    .note-component-wrapper {
      width: 95%;
    }

    .note-flex-container {
      min-width: 300px;
      padding: 20px;
      min-height: auto;
    }
  }

</style>