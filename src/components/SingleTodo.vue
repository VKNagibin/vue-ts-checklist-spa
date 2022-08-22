<template>
  <li class="todo-list__item">
    <input
        type="checkbox"
        class="todo-list__checkbox"
        v-model="isChecked"
        @change="handleCheckbox"
        aria-label="отметить как выполненное"
    >
    <span
        class="todo-list__span"
        ref="span"
        :id="id"
        :class="{['done-todo']: checked}"
        @click="handleClick"
    >
      {{content}}
    </span>
    <div class="btn-group task-btns">
      <button-component @click="handleClick">
        <BIconTrashFill />
      </button-component>
      <button-component>
        <BIconTrashFill />
      </button-component>
    </div>

<!--    <EditInput-->
<!--        :showInput="showInput"-->
<!--        @hideInput="handler"-->
<!--        :componentId="id"-->
<!--        :content="content"-->
<!--    />-->
  </li>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent";

export default {
  components: {
    ButtonComponent
  },

  emits: ["edit"],

  props: {
    id: String,
    checked: Boolean,
    content: String,
    parentid: String,
  },

  data() {
    return {
      showInput: false,
      isChecked: this.$props.checked,
    }
  },

  methods: {
    handleCheckbox() {
      this.$store.dispatch("doneTask",
          {
            noteIndex: this.noteIndex,
            taskId: this.id,
            isChecked: this.isChecked,
          });
    },

    deleteTask(e, id) {
      this.$store.dispatch("deleteTask", {
        noteIndex: this.noteIndex,
        taskId: id,
      });
    },

    handleClick() {
      this.showInput = true;
    }
  },
  beforeUpdate() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.getters.notesArray));
  },
}
</script>

<style lang="scss" scoped>
  .todo-list {
    position: relative;

    &__span {
       z-index: 1;
       position: relative;
       font-size: 1.5rem;
       width: 70%;
     }

    &__item {
       justify-content: center;
     }
  }

  .done-todo {
    text-decoration: line-through;
    opacity: .5;
  }
</style>