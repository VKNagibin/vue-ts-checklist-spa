<template>
  <div class="note-title">

    <h2
        class="todo-heading"
        :id="headingId"
    >
      {{ heading }}
    </h2>

    <button-component
        scale="3"
        hover-transform=".5"
        @click.stop="() => {showInput = true}"
    >
      <template v-slot:leftIcon>
        <BIconPencilSquare />
      </template>
    </button-component>

    <EditInput
        v-if="showInput"
        :id="headingId"
        :content="heading"
        @saveInputContent="setEditInputContent"
        @closeEditInput="() => {showInput = false}"
    />

    </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent";
import EditInput from "@/components/EditInput";

export default {
  components: {
    ButtonComponent,
    EditInput,
  },

  data() {
    return {
      showInput: false,
      heading: this.getHeading(),
      id: this.getNoteId(),
      headingId: this.getNoteId() + "xyz",
    }
  },

  methods: {
    setEditInputContent(content) {
      this.showInput = false;
      this.heading = content;

      this.$services.editNoteHeading(
          {
            id: this.id,
            content,
          }
      );
    },

    getNoteId() {
      return this.$route.params.id;
    },

    getHeading() {
      return this.$services.getNoteHeadingById(this.$route.params.id);
    },
  },
}
</script>

<style scoped>
  h2 {
    position: relative;
  }
  .note-title {
    display: flex;
    gap: 40px;
    align-items: center;
  }
</style>