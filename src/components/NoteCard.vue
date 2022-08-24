<template>
  <div class="wrapper">
  <div class="note-component-wrapper">
    <div class="note-flex-container">
      <h2 class="todo-heading">{{heading}}</h2>
      <ul class="todo-list">
        <li
            class="todo-list-item"
            v-for="todo in shortcutTodosArray()"
            :key="todo.id"
            :class="{checked: todo.checked}"
        >
          <input type="checkbox" class="todo-checkbox" disabled :checked="todo.checked">
          <span class="todo-content">{{todo.content}}</span>
        </li>
      </ul>
    </div>

    <div class="note-buttons-group">
      <button-component
          scale="3"
          @click="handleDeleteButtonClick"
          hover-transform=".5"
      >
        <template v-slot:leftIcon><BIconTrashFill /></template>
      </button-component>
      <button-component
          scale="3"
          @click="redirectToEditNotePage"
          hover-transform=".5"
      >
        <template v-slot:leftIcon><BIconPencilSquare /></template>
      </button-component>
    </div>

  <teleport to="body">
    <confirm-modal v-if="showModal" @response="handleModalAnswer">
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

  data() {
    return {
      showModal: false,
    }
  },

  props: {
    todos: {
      type: Array,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleDeleteButtonClick() {
      this.showModal = true;
    },
    shortcutTodosArray(): ITodo[] {
      const todos = this.$services.getNoteFromStore(this.$props.id).todos;
      return todos.slice(0, 3);
    },

    handleModalAnswer(response: boolean) {
      this.showModal = false;
      if (!response) return;
      this.$services.removeNoteWithChildren(this.$props.id);
    },

    redirectToEditNotePage() {
      if ( !this.$props.id) return
      this.$services.redirectTo(`/note/${this.id}`);
    },
  },

  beforeMount() {
    this.$services.setDataFromLocalToStore();
  },
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
      font-size: 2rem;
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

    &-item {
      width: 100%;
      font-size: 2rem;
      display: flex;
      gap: 40px;
      justify-content: flex-start;
      align-items: center;
      word-break: break-word;
    }

    .todo-content {
      display: block;
      max-width: 600px;
      text-align: left;
      padding: 20px;
      border: 5px solid rgba(221, 160, 221, 0.4);
      border-radius: 10px;
    }

    .todo-checkbox {
      transform: scale(2.5);
      transition: .2s;
      cursor: pointer;

      &:hover {
        transform: scale(3);
      }
    }
  }

  .checked {
    opacity: .5;
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