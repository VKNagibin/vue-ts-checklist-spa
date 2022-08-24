<template>
  <li class="todo-list-item">
    <input
        type="checkbox"
        class="todo-checkbox"
        :checked="isChecked"
        aria-label="отметить как выполненное"
        @change="handleCheckboxChange"
    >
    <span
        @click="openEditInput"
        class="todo-content"
        :id="validHTMLId()"
        :class="{checked: isChecked}"
    >
      {{ content }}
    </span>

      <button-component
          scale="2"
          @click="handleDeleteButtonClick"
          hover-transform=".5"
      >
        <template v-slot:leftIcon>
          <BIconTrashFill />
        </template>
      </button-component>

      <button-component
          scale="2"
          hover-transform=".5"
          @click="openEditInput"
      >
        <template v-slot:leftIcon>
          <BIconPencilSquare />
        </template>
      </button-component>

    <EditInput
        v-if="showInput"
        :id="validHTMLId()"
        :content="content"
        @closeEditInput="() => {showInput = false}"
        @saveInputContent="setEditInputContent"
    />
  </li>
</template>

<script>
import EditInput from "@/components/EditInput";
import ButtonComponent from "@/components/ButtonComponent";
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ButtonComponent,
    EditInput,
  },

  emits: ["edit"],

  props: {
    parentId: String,
    id: String,
    checked: Boolean,
    content: String,
  },

  data() {
    return {
      isChecked: this.$props.checked,
      showInput: false,
      todoContent: this.$props.content,
    }
  },

  methods: {
    setEditInputContent(content) {
      this.showInput = false;
      this.todoContent = content;
      this.$services.editTodoContent(
          {
            id: this.$props.id,
            content,
          }
      )
      this.$services.saveNoteState(
          this.$services.getNoteFromStore(this.$props.parentId)
      );

      this.$emit("changeTodos");
    },

    getCheckboxStatus() {
        return this.$services.getSingleTodo(this.$props.id).checked;
    },

    getTodoContent() {
      return this.$services.getSingleTodo(this.$props.id).content;
    },

    openEditInput() {
      if (this.isChecked) return
      this.showInput = true;
    },
    handleCheckboxChange() {
      this.$services.handleTodoCheckbox(this.$props.id);
      this.saveNoteState();
    },

    saveNoteState() {
      this.$services.setCurrentNoteTodos(this.$props.parentId);
      this.$services.saveNoteState(
          this.$services.getNoteFromStore(this.$props.parentId)
      );
    },

    handleDeleteButtonClick() {
      this.$services.deleteTodo(this.$props.id);
      this.saveNoteState();
    },
    validHTMLId() {
      return `A${this.$props.id}A`
    },
  },
})
</script>

<style lang="scss" scoped>
  .todo-list-item {
    justify-content: center;
  }

  .checked {
    opacity: .5;
  }

  .todo-content {
    position: relative;
    font-size: 1.5rem;
    width: 70%;
  }

  .done-todo {
    text-decoration: line-through;
    opacity: .5;
  }
</style>