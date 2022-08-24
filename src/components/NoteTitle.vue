<template>
  <div class="note-title">
    <h2
        class="todo-heading"
        :id="validHTMLId()"
        @click.stop="() => {showInput = true}"
    >
      {{ getHeading() }}
    </h2>

    <button-component
        scale="3"
        hover-transform=".5"
        @click.stop="() => {showInput = true}"
        class="edit-heading-button"
    >
      <template v-slot:leftIcon>
        <BIconPencilSquare />
      </template>
    </button-component>

    <EditInput
        v-if="showInput"
        :id="validHTMLId()"
        :content="getHeading()"
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
      id: this.getNoteId(),
      headingId: this.getNoteId() + "xyz",
    }
  },

  methods: {
    setEditInputContent(content) {
      this.showInput = false;

      this.$services.editNoteHeading(
          {
            id: this.id,
            content,
          }
      );

      this.$services.saveNoteState(
          this.$services.getNoteFromStore(this.id)
      );
    },

    getNoteId() {
      return this.$route.params.id;
    },

    getHeading() {
      return this.$services.getNoteHeadingById(this.getNoteId());
    },
    validHTMLId() {
      return `A${this.id}A`
    },
  },
}
</script>

<style scoped>
  h2 {
    position: relative;
    width: 80%;
    word-break: break-all;
    text-align: center;

  }
  .edit-heading-button {
    position: absolute;
    right: -10px;
  }
  .note-title {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    align-items: center;
  }
</style>