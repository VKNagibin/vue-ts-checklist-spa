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
        @click="handleTodoClick"
        class="todo-content"
        :id="id"
        :class="{checked: isChecked}"
    >
      {{todoContent}}
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

      <button-component scale="2" hover-transform=".5">
        <template v-slot:leftIcon>
          <BIconPencilSquare />
        </template>
      </button-component>

    <EditInput
        v-if="showInput"
        :id="$props.id"
        :value="todoContent"
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
    id: String,
    checked: Boolean,
    content: String,
  },

  data() {
    return {
      isChecked: this.$props.checked ,
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
    },
    handleTodoClick() {
      this.showInput = true;
    },
    handleCheckboxChange() {
      this.$services.handleTodoCheckbox(this.$props.id);
      this.isChecked = !this.isChecked;
    },

    handleDeleteButtonClick() {
      this.$services.deleteTodo(this.$props.id);
    },
  }
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