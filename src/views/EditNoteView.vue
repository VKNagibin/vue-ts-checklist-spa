<template>
  <div class="note-component-wrapper">
    <button-component
        class="previous-step-button"
        scale="3"
        hover-transform=".5"
        @click="handleBackwardButton"
    >
      <template v-slot:leftIcon>
        <BIconSkipBackward/>
      </template>
    </button-component>
    <button-component
        scale="3"
        hover-transform=".5"
        class="next-step-button"
        @click="handleForwardButton"
    >
      <template v-slot:leftIcon><BIconSkipBackward style="transform: rotate(180deg)" /></template>
    </button-component>

    <div class="note-flex-container">
      <NoteTitle :id="noteId" />
      <button-component
          scale="3"
          @click="createTodo"
          hover-transform=".5"
          >
        <template v-slot:leftIcon><BIconPlusCircle/></template>
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

    <button-component
        scale="3"
        hover-transform=".5"
        @click="handleDeleteNoteButton"
    >
      <template v-slot:leftIcon><BIconTrashFill /></template>
    </button-component>
  </div>

  <button-component
      hover-transform=".2"
      scale="2"
      class="leave-edit-page-button"
      @click="handleCancelEditButton"
  >
    Отменить
  </button-component>
  <button-component
      @click="redirectToHome"
      hover-transform=".2"
      scale="2"
      class="save-changes-button"
  >
    Сохранить
  </button-component>

  <teleport to="body">
    <modal-window v-if="showModal" @response="handleModalResponse">
      {{ modalMessage }}
    </modal-window>
  </teleport>

</template>

<script>
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
      todos: [],
      noteId: this.$route.params.id,
      deleteNoteRequest: false,
      cancelEditRequest: false,
      modalMessage: "",
    }
  },

  methods: {
    handleBackwardButton() {
      const note = this.$services.getPreviousChange();
      if (!note) return
      this.getNoteState(
          note
      )
    },

    handleForwardButton() {
      const note = this.$services.getNextChange();
      if (!note) return
      this.getNoteState(
          note
      )
    },

    showModalHandler(message) {
      this.modalMessage = message;
      this.showModal = true;
    },

    handleDeleteNoteButton() {
      this.showModalHandler("Удалить заметку?");
      this.deleteNoteRequest = true;
    },

    handleCancelEditButton() {
      this.showModalHandler("Отменить редактирование?");
      this.cancelEditRequest = true;
    },

    handleModalResponse(response) {
      this.showModal = false;
      if (this.deleteNoteRequest) return this.deleteNoteHandler(response);
      this.cancelFromEditPageHandler(response);
    },

    deleteNoteHandler(response) {
      if (!response) return
      this.$services.redirectTo("/");
      setTimeout(() => {
        this.$services.removeNoteWithChildren(this.noteId);
      }, 0);
    },

    getNoteState(note) {
      this.$services.replaceNote(
          {
            id: this.noteId,
            note,
          }
      )
      this.$services.replaceTodos(
          {
            parentId: this.noteId,
            todos: this.$services.getNoteFromStore(this.noteId).todos,
          }
      )
    },

    cancelFromEditPageHandler(response) {
      if (!response) return
      this.getNoteState(
          this.$services.getInitialNoteState()
      );
      this.$services.redirectTo("/");
    },

    createTodo() {
      this.$services.createTodo(this.noteId);
      this.$services.setCurrentNoteTodos(this.noteId);
      this.$services.saveNoteState(
          this.$services.getNoteFromStore(this.noteId)
      );
    },

    redirectToHome() {
      this.$services.redirectTo("/");
    },

    getCurrentNoteTodos() {
      return this.$services.setCurrentNoteTodos(this.noteId);
    },

  },

  beforeUnmount() {
    this.$services.updateLocalNotesArray();
  },

  beforeMount() {
    this.$services.setDataFromLocalToStore();
    this.$services.setInitialNoteState(
        this.$services.getNoteFromStore(this.noteId)
    );
    this.getNoteState(
        this.$services.getInitialNoteState()
    );
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

  .previous-step-button, .next-step-button {
    top: 10%;
    position: fixed;
    padding: 5px;
    border: 2px solid rgba(128, 128, 128, 0.43);
    border-radius: 5px;
    right: 5%;
  }

  .previous-step-button {
    right: auto;
    left: 5%;
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

  .leave-edit-page-button, .save-changes-button {
    position: fixed;
    bottom: 5%;
    right: 5%;
    border: 2px solid grey;
    padding: 5px;
    border-radius: 5px;
  }

  .save-changes-button {
    right: auto;
    left: 5%;
  }
</style>