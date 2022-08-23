<template>
  <div class="note-component-wrapper">
    <button-component
        scale="3"
        hover-transform=".5">
      <template v-slot:leftIcon><BIconSkipBackward /></template>
    </button-component>
    <button-component scale="3" hover-transform=".5">
      <template v-slot:leftIcon><BIconSkipBackward style="transform: rotate(180deg)" /></template>
    </button-component>

    <div class="note-flex-container">
      <NoteTitle :id="noteId" />
      <button-component
          scale="3"
          @click="createTodo"
          hover-transform=".5"
          >
        <template v-slot:leftIcon><BIconPlusCircle /></template>
      </button-component>
      <transition-group
          class="todo-list"
          name="list"
          tag="ul"
      >
        <SingleTodo
            v-for="todo in getCurrentNoteTodos()"
            :key="todo.id"
            v-bind="todo"
        />
      </transition-group>
    </div>

    <button-component scale="3" hover-transform=".5">
      <template v-slot:leftIcon><BIconTrashFill /></template>
    </button-component>
  </div>

  <button-component  content="Отмена" hover-transform=".2"/>
  <button-component
      @click="redirectToHome"
      content="Сохранить"
      hover-transform=".2"
  />

  <teleport to="body">
    <modal-window v-if="showModal">
    </modal-window>
  </teleport>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoteTitle from "@/components/NoteTitle.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ModalWindow from "@/components/ConfirmModal.vue";
import SingleTodo from "@/components/SingleTodo.vue";

export default defineComponent({
  components: {
    ButtonComponent,
    NoteTitle,
    SingleTodo,
    ModalWindow,
  },

  data() {
    return {
      showModal: false,
      noteId: this.$route.params.id as string,
    }
  },

  methods: {
    createTodo() {
      this.$services.createTodo(this.noteId);
      this.$services.updateLocalTodos();
    },
    redirectToHome() {
      this.$services.redirectTo("/");
    },

    getCurrentNoteTodos() {
      return this.$services.getCurrentNoteTodosFromStore(this.noteId);
    }
  },

  beforeUnmount() {
    this.$services.updateLocalNotesArray();
  },

  beforeMount() {
    this.$services.setDataFromLocalToStore();
  },
})
</script>

<style lang="scss" scoped>
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }

  .list-enter-active,
  .list-leave-active {
    transition: all .3s ease-in-out;
  }

  .note-component-wrapper {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .note-flex-container {
    width: 100%;
    padding: 50px;
    display: flex;
    gap: 40px;
    flex-direction: column;
    align-items: center;

    .todo-heading {
      font-size: 4rem;
      text-align: center;
    }
  }

  .create-task-btn {
    will-change: transform;
    transition: .2s;
    padding: 0;
    transform: scale(2);
    cursor: pointer;
    border: none;

    &:hover {
      transform: scale(2.3);
    }
  }

  .todo-list {
    padding: 0 5%;
  }

  .edit-task-modal {
    z-index: 20;
    display: flex;
    background: #000;
    flex-direction: column;
    gap: 10px;
    position: fixed;
    height: 30px;
    top: 10%;
    right: 50%;
    transform: translateX(50%);

    .btn-group {
      justify-content: flex-end;
    }
  }

  .edit-task-btn {
    box-sizing: content-box;
    padding: 10px;
    width: 50px;
    font-size: 1rem;
  }

  .edit-note-btns {
    width: 95%;
    display: flex;
    position: fixed;
    justify-content: space-between;
    z-index: 11;
    bottom: 10px;
    gap: 40px;
  }

  @media (max-width: 768px) {
    .note-component-wrapper {
      width: 100%;
    }

    .note-flex-container {
      border: none;
    }

    .todo-heading {
      padding-top: 50px;
    }

    .note-flex-container {
      padding: 10px 0 20px;
    }

    .note-title {
      flex-direction: column-reverse;
    }

    .task-btns {
      flex-direction: column;
    }
  }

  @media (max-width: 540px) {
    .todo-heading {
      padding-top: 70px;
    }

    .cancel-edit-btn {
      bottom: 0;
    }
    .save-changes-btn {
      bottom: 50px;
    }
  }
</style>