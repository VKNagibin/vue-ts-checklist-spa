<template>
  <div class="note-title">
    <button-component scale="3" @click="createTodo">
      <template v-slot:leftIcon><BIconPlusCircle /></template>
    </button-component>
    <h2 class="todo-heading"
        :id="$props.id"
        @click="handleClick"
    >
      {{ heading }}
    </h2>

    <button-component scale="3">
      <BIconPencilFill />
    </button-component>

<!--  <EditInput-->
<!--      @hideInput="handler"-->
<!--      :showInput="showInput"-->
<!--      :componentId="id"-->
<!--      :content="content"-->
<!--  />-->
    </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent";

export default {
  props: {
    id: String,
  },

  components: {
    ButtonComponent,
  },

  data() {
    return {
      showInput: false,
    }
  },

  methods: {
    handler() {
      this.showInput = false;
    },

    createTodo() {
      this.$services.createTodo(this.$route.params.id);
    },



    handleClick() {
      this.showInput = true;
    }
  },

  computed: {
    heading() {
      return this.$services.getNoteHeadingById(this.$route.params.id);
    }
  },

  beforeMount() {
    this.$services.getLocalNotesArray();
  },
}
</script>

<style scoped>
  .note-title {
    display: flex;
    gap: 40px;
    align-items: center;
  }
</style>